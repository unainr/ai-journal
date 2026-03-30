import { getJournalById } from '@/modules/editor/server/create-journal';
import JournalEditor from '@/modules/editor/ui/journal-editor';
import React from 'react'
interface Props{
    params:Promise<{id:string}>
}
const JournalIdPage = async ({params}:Props) => {
  const {id} = await params
    const journalRes = await getJournalById(id);
 if (!journalRes.success) {
    return <p>{journalRes.error || "Journal not found"}</p>;
  }

  const journal = journalRes.data;
    return (
    <>
    <JournalEditor
      journalId={journal?.id}
      initialTitle={journal?.title ?? ""}
      initialContent={journal?.content}
      initialImageUrls={(journal?.imageUrls as string[]) ?? []}
    />
    </>
    
  )
}

export default JournalIdPage