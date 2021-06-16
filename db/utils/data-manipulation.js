// extract any functions you are using to manipulate your data, into this file
exports.formatTopicsData = (topicsArray) => {
  return topicsArray.map(({ slug, description }) => {
    return [slug, description];
  });
};

exports.formatUsersData = (usersArray) => {
  return usersArray.map(({ username, avatar_url, name }) => {
    return [username, avatar_url, name];
  });
};

exports.formatArticlesData = (articleArray) => {
  return articleArray.map(
    ({ title, topic, author, body, created_at, votes = 0 }) => {
      return [title, body, votes, topic, author, created_at];
    }
  );
};

// Need to create relationship between title of article and the id its assigned.
exports.createArticleRef = (articlesArr, key, value) => {
  const objRef = {};

  if (Object.keys(articlesArr).length) {
    articlesArr.forEach((article) => {
      objRef[article[key]] = article[value];
    });
  }
  return objRef;
};

exports.newKeys = (list, keyToChange, newKey) => {
  const newList = list.map((listItem) => {
    let newItem = { ...listItem };
    newItem[newKey] = newItem[keyToChange];
    delete newItem[keyToChange];
    return newItem;
  });

  return newList;
};

exports.formatCommentsData = (commentArray, articleRef) => {
  return commentArray.map(
    ({ body, belongs_to, author, votes = 0, created_at }) => {
      return [author, articleRef[belongs_to], votes, created_at, body];
    }
  );
};
