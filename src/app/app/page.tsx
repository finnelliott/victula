import EntryListCard from "@/components/application/entries/EntryListCard";
import PageWrapper from "@/components/application/layout/PageWrapper";

export default function AppHome() {
    return (
        <main className="z-0 relative h-full">
            <PageWrapper heading="Dashboard">
                <div className="flex flex-col py-8">
                    {/* @ts-expect-error Async Server Component */}
                    <EntryListCard />
                </div>
            </PageWrapper>
        </main>
    )
}