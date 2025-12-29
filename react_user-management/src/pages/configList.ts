export const configList = [
  {
    code: "POINT_SELF_LEADER",
    type: "POINT",
    roleList: ["SELF", "LEADER"],
  },
  {
    code: "COMMENT_SELF",
    type: "COMMENT",
    roleList: ["SELF"],
  },
  {
    code: "COMMENT_LEADER",
    type: "COMMENT",
    roleList: ["LEADER"],
  },
  {
    code: "COMMENT_MANAGER",
    type: "COMMENT",
    roleList: ["MANAGER"],
  },
  {
    code: "COMMENT_DIRECTOR",
    type: "COMMENT",
    roleList: ["DIRECTOR"],
  },
  {
    code: "TARGET_LEADER",
    type: "TARGET",
    roleList: ["LEADER"],
  },
] as const;

export const configMap = Object.fromEntries(
  configList.map(c => [c.code, c])
);

const cfg = configMap["POINT_SELF_LEADER"];
