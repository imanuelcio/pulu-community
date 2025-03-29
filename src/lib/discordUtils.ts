// utils/discordUtils.ts

export interface ThreadData {
  description: string;
  image: string;
  username: string;
  discordId: string;
  profilePicture: string;
  slug: string;
}

export const processThreadsData = (threads: any[]): ThreadData[] => {
  return threads.map((thread) => {
    const title = thread.name || "Untitled"; // Use thread name as title
    const description = thread.message || ""; // Get description from message body if available
    const image = thread.icon_url || ""; // Use icon URL if available (adjust based on actual response structure)
    const username = thread.owner?.username || "Unknown User"; // Get username from owner
    const discordId = thread.owner?.id || ""; // Get Discord user ID
    const profilePicture = thread.owner?.avatar_url || ""; // Get profile picture URL

    // Create a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    return {
      title,
      description,
      image,
      username,
      discordId,
      profilePicture,
      slug,
    };
  });
};
