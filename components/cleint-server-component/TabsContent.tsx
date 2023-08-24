"use client"
import { TabsContent as RadixTabsContent } from "@radix-ui/react-tabs";

interface MyTabsContentProps {
    value: string; // The value associated with this tab content
    children: React.ReactNode; // Content to be displayed inside the tab
    className?: string; // Optional class name for additional styling
}

const MyTabsContent: React.FC<MyTabsContentProps> = ({ value, children, className }) => {
    return (
        <RadixTabsContent value={value} className={className}>
            {children}
        </RadixTabsContent>
    );
};

export default MyTabsContent;
