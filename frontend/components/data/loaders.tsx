import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { unstable_noStore as noStore } from 'next/cache';
import { getAuthToken } from "./services/get-token";

const baseUrl = getStrapiURL();

async function fetchData(url: string) {
  const authToken = await getAuthToken();
//  const authToken = "";
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    },
  };

  try {
//    const response = await fetch(url, authToken ? headers : { cache: 'no-store' });
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    console.log("data from loaders")
    console.log(data)
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getHomePageData() {
//    throw new Error("Test error");
    noStore()
    const url = new URL("/api/home-page", baseUrl);
  
    url.search = qs.stringify({
      populate: {
        blocks: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
            feature: {
              populate: true,
            },
          },
        },
      },
    });
  
    return await fetchData(url.href);
}

export async function getGlobalData() {
    noStore()
    const url = new URL("/api/global", baseUrl);
  
    url.search = qs.stringify({
      populate: [
        "header.logoText",
        "header.ctaButton",
        "footer.logoText",
        "footer.socialLink",
      ],
    });
  
    return await fetchData(url.href);
}

export async function getGlobalPageMetadata() {
    noStore()
    const url = new URL("/api/global", baseUrl);
  
    url.search = qs.stringify({
      fields: ["title", "description"],
    });
  
    return await fetchData(url.href);
}

export async function getSummaries(queryString: string, currentPage: number) {
    const PAGE_SIZE = 4;
    const query = qs.stringify({
      sort: ["createdAt:desc"],
      filters: {
        $or: [
          { title: { $containsi: queryString } },
          { summary: { $containsi: queryString } },
        ],
      },
      pagination: {
        pageSize: PAGE_SIZE,
        page: currentPage,
      },
    });
    const url = new URL("/api/summaries", baseUrl);
    url.search = query;
    return fetchData(url.href);
}

export async function getSummaryById(summaryId: string) {
    return fetchData(`${baseUrl}/api/summaries/${summaryId}`);
  }