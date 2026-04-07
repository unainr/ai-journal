"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef, useState } from "react";
import { ImageUpload } from "@/lib/image-upload";
import { createJournal, updateJournal } from "../server/create-journal";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  ImageIcon,
  Save,
  Strikethrough,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiMermaidDrawer } from "./ai-mermaid-drawer";
import AIFloatingBar from "./ai-floating-bar";
import { DeleteJournalDialog } from "./delete-journal";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { useUpgrade } from "@/modules/pricing/hooks/use-upgrade";
import { UpgradeDialog } from "@/modules/pricing/ui/components/upgrade-dialog";
import { canUploadImage } from "@/modules/pricing/server/pricing";

type Props = {
  initialTitle?: string;
  initialContent?: string;
  initialImageUrls?: string[];
  journalId?: string;
};
export default function JournalEditor({
  initialTitle = "",
  initialContent = "",
  initialImageUrls = [],
  journalId,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialTitle);
const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls);  
const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
const router = useRouter()
const queryClient = useQueryClient();
const { open, reason, showUpgrade, onClose } = useUpgrade();
// TODO:Pricing dialog box 

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder: "Start writing your thoughts…" }),
    ],
    editorProps: {
      attributes: {
        class:
         "bg-white dark:bg-zinc-900 text-black dark:text-white prose prose-invert min-h-[360px] focus:outline-none px-6 py-5",
      },
    },
     content: initialContent, // ✅ pre-fill content
  });

  const handleImageUpload = async (file: File) => {
     // check image limit before uploading
  const { allowed, error, upgrade } = await canUploadImage(imageUrls.length);
  if (!allowed) {
    if (upgrade) showUpgrade(error ?? undefined);
    else toast.error(error ?? "Upload not allowed");
    return;
  }
    setUploading(true);
    const url = await ImageUpload(file);
    setUploading(false);
    if (url && editor) {
      setImageUrls((prev) => [...prev, url]); // ✅ push to array
      editor.chain().focus().setImage({ src: url }).run();
      toast.success("Image uploaded");
    } else {
      toast.error("Image upload failed");
    }
  };


  
    const { mutateAsync: saveJournal } = useMutation({
  mutationFn: async (payload: any) => {
    if (journalId) {
      return await updateJournal(payload);
    } else {
      return await createJournal(payload);
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.journals });
  },
});

  const handleSave = async () => {
  if (!editor) return;

  const content = editor.getHTML();
  if (!content || editor.isEmpty) {
    toast.error("Nothing to save");
    return;
  }

  const extractedUrls: string[] = [];
  const imgTags = content.match(/<img[^>]+src="([^">]+)"/g);

  if (imgTags) {
    imgTags.forEach((tag) => {
      const srcMatch = tag.match(/src="([^">]+)"/);
      if (srcMatch) extractedUrls.push(srcMatch[1]);
    });
  }

  setSaving(true);

  const result = await saveJournal({
    id: journalId,
    title: title || undefined,
    content,
    imageUrls: extractedUrls.length > 0 ? extractedUrls : undefined,
  });

  setSaving(false);

   //Pricing update handleSave — after result check
if (result?.error) {
  if ("upgrade" in result && result.upgrade) {
    showUpgrade(result.error ?? undefined);
    return;
  }

  toast.error(result.error);
  return;
}

  toast.success(journalId ? "Journal updated" : "Journal saved");

  router.push(`/dashboard/${result.data?.id}`);
};

  const ToolbarBtn = ({
    onClick,
    active,
    children,
    title: tip,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title?: string;
  }) => (
    <Button
    variant={'secondary'}
      type="button"
      onClick={onClick}
      title={tip}
      className={`
        flex items-center justify-center w-8 h-8 rounded-md transition-all duration-150
        ${
          active
            ?? "bg-red/40"
            
        }
      `}
    >
      {children}
    </Button>
  );

  const wordCount = editor?.getText().trim().split(/\s+/).filter(Boolean).length ?? 0;

  return (
    <>
    <div className="min-h-screen  flex items-start justify-center px-4 py-12">
      <div className="w-full  flex flex-col gap-0">

        {/* Header */}
       <div className="mb-6 flex items-start justify-between">
  <div>
    <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3 font-medium">
      {journalId ? "Editing" : "New entry"}
    </p>
    <input
      type="text"
      placeholder="Untitled"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full bg-transparent text-3xl font-semibold outline-none placeholder:text-zinc-700 tracking-tight"
    />
  </div>

  {/* Delete — only shows when editing existing journal */}
  {journalId && <DeleteJournalDialog journalId={journalId} />}
</div>

        {/* Editor card */}
        <div className="rounded-2xl overflow-hidden">

          {/* Toolbar */}
          <div className="flex items-center gap-0.5 px-4 py-2.5 ">
            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleBold().run()}
              active={editor?.isActive("bold")}
              title="Bold"
            >
              <Bold size={14} />
            </ToolbarBtn>

            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              active={editor?.isActive("italic")}
              title="Italic"
            >
              <Italic size={14} />
            </ToolbarBtn>

            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              active={editor?.isActive("strike")}
              title="Strikethrough"
            >
              <Strikethrough size={14} />
            </ToolbarBtn>

            {/* divider */}
            <div className="w-px h-4 bg-white/8 mx-1.5" />

            <ToolbarBtn
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              active={editor?.isActive("heading", { level: 1 })}
              title="Heading 1"
            >
              <Heading1 size={14} />
            </ToolbarBtn>

            <ToolbarBtn
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor?.isActive("heading", { level: 2 })}
              title="Heading 2"
            >
              <Heading2 size={14} />
            </ToolbarBtn>

            {/* divider */}
            <div className="w-px h-4 bg-white/8 mx-1.5" />

            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              active={editor?.isActive("bulletList")}
              title="Bullet list"
            >
              <List size={14} />
            </ToolbarBtn>

            {/* divider */}
            <div className="w-px h-4 bg-white/8 mx-1.5" />

            <Button
            className="rounded-none"
            variant={'primary'}
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              size={'sm'}
            >
              <ImageIcon size={13} />
              <span>{uploading ? "Uploading…" : "Image"}</span>
            </Button>

            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
                e.target.value = "";
              }}
            />

            {/* divider */}
            <div className="w-px h-4 bg-white/8 mx-1.5" />

            <AiMermaidDrawer editor={editor} />
          </div>

          {/* Editor content */}
         <div className="relative">
        <AIFloatingBar editor={editor} onUpgrade={showUpgrade} />
        <EditorContent editor={editor} />
        </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3">
            <span className="text-xs text-zinc-600 tabular-nums">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>

            <Button
            variant={'primary'}
              type="button"
              onClick={handleSave}
              className="rounded-none"
              disabled={saving}
            >
              <Save size={12} />
              {saving ? "Saving…" : "Save journal"}
            </Button>
          </div>
        </div>

        {/* Date stamp */}
        <p className="text-xs text-zinc-700 mt-3 px-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      {/* ✅ add this */}
    </div>
    <UpgradeDialog open={open} onClose={onClose} reason={reason} />
    </>
  );
}