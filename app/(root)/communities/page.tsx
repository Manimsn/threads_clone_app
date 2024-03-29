import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

// import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";

// async function Page({
//     searchParams,
// }: {
//     searchParams: { [key: string]: string | undefined };
// }) {
async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    //   Fetch Communities
    const result = await fetchCommunities({
        // searchString: searchParams.q,
        searchString: '',
        // pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageNumber: 1,
        pageSize: 25,
    });

    return (
        <section>
            <h1 className='head-text mb-10'>Communitites</h1>

            {/* <Searchbar routeType='search' /> */}

            <div className='mt-14 flex flex-col gap-9'>
                {result.communities.length === 0 ? (
                    <p className='no-result'>No Result</p>
                ) : (
                    <>
                        {result.communities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* <Pagination
                path='search'
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={result.isNext}
            /> */}
        </section>
    );
}

export default Page;