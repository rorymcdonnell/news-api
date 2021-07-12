const {
  formatTopicsData,
  formatUsersData,
  formatArticlesData,
  createArticleRef,
  newKeys,
  formatCommentsData,
} = require("../db/utils/data-manipulation");

describe("formatDataTopics", () => {
  test("returns empty array when given empty array ", () => {
    expect(formatTopicsData([])).toEqual([]);
  });
  test("should convert array containing single object to nested array ", () => {
    expect(formatTopicsData([{ description: "a", slug: "b" }])).toEqual([
      ["b", "a"],
    ]);
  });
  test("should convert array containing multiple objects into nested array", () => {
    expect(
      formatTopicsData([
        { description: "a", slug: "b" },
        { description: "c", slug: "d" },
        { description: "e", slug: "f" },
      ])
    ).toEqual([
      ["b", "a"],
      ["d", "c"],
      ["f", "e"],
    ]);
  });
  test("does not mutate input", () => {
    const input = [
      { description: "a", slug: "b" },
      { description: "c", slug: "d" },
      { description: "e", slug: "f" },
    ];
    expect(formatTopicsData(input)).not.toBe(input);
    expect(input).toEqual([
      { description: "a", slug: "b" },
      { description: "c", slug: "d" },
      { description: "e", slug: "f" },
    ]);
  });
});

describe("formatUsersData", () => {
  test("should return empty array when given empty array", () => {
    expect(formatUsersData([])).toEqual([]);
  });
  test("should convert array containing single object to nested array", () => {
    expect(
      formatUsersData([{ username: "a", avatar_url: "b", name: "c" }])
    ).toEqual([["a", "b", "c"]]);
  });
  test("should convert array containing multiple object to nested array", () => {
    expect(
      formatUsersData([
        { username: "a", avatar_url: "b", name: "c" },
        { username: "d", avatar_url: "e", name: "f" },
      ])
    ).toEqual([
      ["a", "b", "c"],
      ["d", "e", "f"],
    ]);
  });
  test("does not mutate input", () => {
    const input = [
      { username: "a", avatar_url: "b", name: "c" },
      { username: "d", avatar_url: "e", name: "f" },
    ];
    expect(formatUsersData(input)).not.toBe(input);
    expect(input).toEqual([
      { username: "a", avatar_url: "b", name: "c" },
      { username: "d", avatar_url: "e", name: "f" },
    ]);
  });
});

describe("formatArticlesData", () => {
  test("should return empty array when given empty array", () => {
    expect(formatArticlesData([])).toEqual([]);
  });
  test("should convert array containing single object to nested array", () => {
    expect(
      formatArticlesData([
        {
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: new Date(1594329060000),
          votes: 100,
        },
      ])
    ).toEqual([
      [
        "Living in the shadow of a great man",
        "I find this existence challenging",
        100,
        "mitch",
        "butter_bridge",

        new Date(1594329060000),
      ],
    ]);
  });
  test("should convert array containing multiple object to nested array", () => {
    expect(
      formatArticlesData([
        {
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: new Date(1594329060000),
          votes: 100,
        },
        {
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: new Date(1604394720000),
        },
      ])
    ).toEqual([
      [
        "Living in the shadow of a great man",
        "I find this existence challenging",
        100,
        "mitch",
        "butter_bridge",
        new Date(1594329060000),
      ],
      [
        "Eight pug gifs that remind me of mitch",
        "some gifs",
        0,
        "mitch",
        "icellusedkars",
        new Date(1604394720000),
      ],
    ]);
  });
  test("does not mutate input", () => {
    const input = [
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(1604394720000),
      },
    ];
    expect(formatArticlesData(input)).not.toBe(input);
    expect(input).toEqual([
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(1604394720000),
      },
    ]);
  });
});

describe("createArticleRef", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = createArticleRef(input);
    const expected = {};
    expect(actual).toEqual(expected);
  });

  it("should return a lookup object when given an array with a single person object", () => {
    const input = [
      {
        owner_id: 10,
        forename: "firstname-j",
        surname: "lastname-j",
        age: 29,
      },
    ];
    const actual = createArticleRef(input, "forename", "owner_id");
    const expected = { "firstname-j": 10 };
    expect(actual).toEqual(expected);
  });

  it("should return a lookup object when given an array with > 1 person object", () => {
    let input = [
      {
        owner_id: 10,
        forename: "firstname-j",
        surname: "lastname-j",
        age: 29,
      },
      {
        owner_id: 11,
        forename: "firstname-k",
        surname: "lastname-k",
        age: 102,
      },
      {
        owner_id: 9,
        forename: "firstname-i",
        surname: "lastname-i",
        age: 63,
      },
    ];
    let actual = createArticleRef(input, "forename", "owner_id");
    let expected = {
      "firstname-j": 10,
      "firstname-k": 11,
      "firstname-i": 9,
    };
    expect(actual).toEqual(expected);
  });

  it("should not mutate the given array", () => {
    let input = [
      {
        owner_id: 10,
        forename: "firstname-j",
        surname: "lastname-j",
        age: 29,
      },
      {
        owner_id: 11,
        forename: "firstname-k",
        surname: "lastname-k",
        age: 102,
      },
      {
        owner_id: 9,
        forename: "firstname-i",
        surname: "lastname-i",
        age: 63,
      },
    ];
    expect(createArticleRef(input)).not.toBe(input);
    expect(input).toEqual([
      {
        owner_id: 10,
        forename: "firstname-j",
        surname: "lastname-j",
        age: 29,
      },
      {
        owner_id: 11,
        forename: "firstname-k",
        surname: "lastname-k",
        age: 102,
      },
      {
        owner_id: 9,
        forename: "firstname-i",
        surname: "lastname-i",
        age: 63,
      },
    ]);
  });
});

describe("newKeys", () => {
  it("returns a new empty array, when passed an empty array", () => {
    const albums = [];
    const keyToChange = "";
    const newKey = "";
    const actual = newKeys(albums, keyToChange, newKey);
    const expected = [];
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(albums);
  });
  it("should rename the given key of a single object in an array", () => {
    const books = [
      { title: "Slaughterhouse-Five", writtenBy: "Kurt Vonnegut" },
    ];

    expect(newKeys(books, "writtenBy", "author")).toEqual([
      {
        title: "Slaughterhouse-Five",
        author: "Kurt Vonnegut",
      },
    ]);
  });
  it("should rename the given key of > 1 objects in an array", () => {
    const books = [
      { title: "Slaughterhouse-Five", writtenBy: "Kurt Vonnegut" },
      {
        title: "Blood Meridian",
        genre: "anti-western",
        writtenBy: "change my key",
      },
    ];
    const keyToChange = "writtenBy";
    const newKey = "author";
    const expected = [
      { title: "Slaughterhouse-Five", author: "Kurt Vonnegut" },
      {
        title: "Blood Meridian",
        genre: "anti-western",
        author: "change my key",
      },
    ];

    expect(newKeys(books, keyToChange, newKey)).toEqual(expected);
  });
  it("should not mutate the given list object", () => {
    const books = [
      { title: "Slaughterhouse-Five", writtenBy: "Kurt Vonnegut" },
      {
        title: "Blood Meridian",
        genre: "anti-western",
        writtenBy: "change my key",
      },
    ];
    newKeys(books, "writtenBy", "author");
    expect(books).toEqual([
      { title: "Slaughterhouse-Five", writtenBy: "Kurt Vonnegut" },
      {
        title: "Blood Meridian",
        genre: "anti-western",
        writtenBy: "change my key",
      },
    ]);
  });
});

describe("formatCommentsData", () => {
  test("should return empty array when given empty array", () => {
    expect(formatCommentsData([])).toEqual([]);
  });
  test("should convert array containing single object to nested array", () => {
    expect(
      formatCommentsData(
        [
          {
            body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
            belongs_to: "Making sense of Redux",
            author: "grumpy19",
            votes: 7,
            created_at: new Date(1577890920000),
          },
        ],
        { "Making sense of Redux": 1 }
      )
    ).toEqual([
      [
        "grumpy19",
        1,
        7,
        new Date(1577890920000),
        "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
      ],
    ]);
  });
  test("should convert array containing multiple object to nested array", () => {
    expect(
      formatCommentsData(
        [
          {
            body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
            belongs_to: "Making sense of Redux",
            author: "grumpy19",
            votes: 7,
            created_at: new Date(1577890920000),
          },
          {
            body: "yes",
            belongs_to: "Cheese",
            author: "bob",
            votes: 10,
            created_at: new Date(1577890946700),
          },
        ],
        { "Making sense of Redux": 1, Cheese: 2 }
      )
    ).toEqual([
      [
        "grumpy19",
        1,
        7,
        new Date(1577890920000),
        "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
      ],
      ["bob", 2, 10, new Date(1577890946700), "yes"],
    ]);
  });
  test("does not mutate input", () => {
    const inputArray = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: new Date(1577890920000),
      },
    ];
    const inputRef = { "Making sense of Redux": 1 };
    formatCommentsData(inputArray, inputRef);
    expect(inputArray).toEqual([
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: new Date(1577890920000),
      },
    ]);
    expect(inputRef).toEqual({ "Making sense of Redux": 1 });
  });
});
