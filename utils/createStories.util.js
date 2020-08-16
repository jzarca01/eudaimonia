const _ = require("underscore");

function groupByMulti(obj, values, context) {
  if (!values.length) return obj;
  var byFirst = _.groupBy(obj, values[0], context),
    rest = values.slice(1);
  for (var prop in byFirst) {
    byFirst[prop] = groupByMulti(byFirst[prop], rest, context);
  }
  return byFirst;
}

export function createStories(rawData) {
  const data = groupByMulti(rawData, ["username", "title"]);
  return Object.keys(data)
    .map((key) => {
      const availableStories = Object.keys(data[key]);
      const structuredStories = availableStories.map((story) => {
        const firstStory = data[key][story][0];
        return {
          username: key,
          title: story,
          profile: firstStory.coverUrl || firstStory.url,
          stories: data[key][story],
          soundUrl: firstStory.soundUrl,
          coverUrl: firstStory.coverUrl || firstStory.url,
        };
      });
      return structuredStories;
    })
    .flat(2);
}
