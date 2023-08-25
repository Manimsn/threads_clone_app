import React from "react";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs"
import { communityTabs, profileTabs } from "../../../../constants";

import MyTabsContent from "../../../../components/cleint-server-component/TabsContent";
import ProfileHeader from "../../../../components/shared/ProfileHeader";
import ThreadsTab from "../../../../components/shared/ThreadsTab";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import UserCard from "../../../../components/cards/UserCard";
import { fetchCommunityDetails } from '../../../../lib/actions/community.actions'


async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) return null;

    const communityDetails = await fetchCommunityDetails(params.id)

    return (
        <section className="">
            <ProfileHeader
                accountId={communityDetails.id}
                authUserId={user.id}
                name={communityDetails.name}
                username={communityDetails.username}
                imageUrl={communityDetails.image}
                bio={communityDetails.bio}
                type="Community"
            />

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {communityTabs.map((tab) => (
                            <TabsTrigger key={tab.label}
                                value={tab.value} className="tab">
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-containt"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>

                                {tab.label === 'Threads' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1
                                    text-tiny-medium text-light-2">{communityDetails?.threads?.length}</p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <MyTabsContent
                        value="threads"
                        className="w-full text-light-1"
                    >
                        <ThreadsTab
                            currentUserId={user.id}
                            accountId={communityDetails._id}
                            accountType="Community"
                        />
                    </MyTabsContent>

                    <MyTabsContent
                        value="members"
                        className="w-full text-light-1"
                    >
                        <section className="mt-9 flex flex-col gap-10">
                            {communityDetails?.members.map((member: any) => (
                                <UserCard
                                    key={member.id}
                                    id={member.id}
                                    name={member.name}
                                    username={member.username}
                                    imageUrl={member.image}
                                    personType="User"
                                />
                            ))}
                        </section>
                    </MyTabsContent>
                    <MyTabsContent
                        value="requests"
                        className="w-full text-light-1"
                    >
                        <ThreadsTab
                            currentUserId={user.id}
                            accountId={communityDetails._id}
                            accountType="Community"
                        />
                    </MyTabsContent>

                </Tabs>
            </div>
        </section>
    )
}

export default Page