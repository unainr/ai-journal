import { MainHeader } from "@/components/layouts/main-header";
import { LayoutTypes } from "@/types";

const Layout = ({ children }: LayoutTypes) => {
	return (
		<>
			<MainHeader />
			{children}
		</>
	);
};

export default Layout;
