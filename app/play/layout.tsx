export default function PlayLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className="bg-black">
            {children}
        </div>
    );
}