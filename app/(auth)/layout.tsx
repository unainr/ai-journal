import { LayoutTypes } from "@/types";

const Layout = ({ children }: LayoutTypes) => {
	return (
		<div className="grid min-h-svh lg:grid-cols-2 dark:bg-[#212126] overflow-hidden ">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center ">
					<div className="w-full max-w-md">{children}</div>
				</div>
			</div>
			<div className="bg-muted relative hidden lg:block ">
				<img
					src="/next.svg"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover "
				/>
			</div>
		</div>
	);
};

export default Layout;
