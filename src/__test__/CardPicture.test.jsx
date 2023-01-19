import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import CardPicture from "../components/CardPicture";

/**
 * @jest-environment jsdom
 */

test("show new data pic when user clicked prev or next button", async () => {
  const feedsData = {
    media: { m: "1.jpg" },
    title: "pic1",
    author: 'as "title1"',
    tags: "this tag",
  };

  const feed = render(
    <>
      <CardPicture feed={feedsData} />
    </>
  );

  const cardPic = await feed.findByTestId("media_pic");
  const title = await feed.findByTestId("title_feed");
  const titleValue = await title.textContent;
  const author = await feed.findByTestId("author_feed");
  const authorValue = await author.textContent;
  const tag = await feed.findByTestId("tag_feed");
  const tagValue = await tag.textContent;
  expect(cardPic.src).toContain("1.jpg");
  expect(titleValue).toContain("pic1");
  expect(authorValue).toContain("title1");
  expect(tagValue).toContain("this tag");
  feed.unmount();
});
