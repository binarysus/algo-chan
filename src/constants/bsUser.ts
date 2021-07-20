interface Badge {
  id: number,
  userId: number,
  type: string,
  createTime: number,
  count: number,
}

export default interface BSUser {
    id: number,
    username: string,
    isAdmin: boolean,
    profilePic: string,
    isVerified: boolean,
    preferredHistoryPublic: boolean,
    preferredSessionCapacity: number,
    preferredSessionTitle: string,
    preferredLanguage: string,
    preferredRoomPublic: boolean,
    preferredInviteOnly: boolean,
    preferredRole: null,
    preferredTabSize: number,
    preferredFontSize: number,
    preferredQuestionsPerSession: number,
    preferredSubmissionPrivacy: string,
    major: null,
    keymap: string,
    preferredTheme: string,
    bio: string,
    work: null,
    college: string,
    location: string,
    githubHandle: string,
    twitterHandle: null,
    linkedinHandle: null,
    personalWebsite: null,
    flair: string,
    createTime: string,
    updateTime: string,
    badges: Badge[],
    stat: {
      id: number,
      userId: number,
      numMessagesSent: number,
      numSessionsAbandoned: number,
      rank: number,
      numEasySolved: number,
      numMediumSolved: number,
      numHardSolved: number,
      numHarderSolved: number,
      numTotalSolved: number,
      numEasySolvedToday: number,
      numMediumSolvedToday: number,
      numHardSolvedToday: number,
      numHarderSolvedToday: number,
      numTotalSolvedToday: number,
      updateTime: number,
      numSessions: number,
      numSessionsSolved: number,
      helpful: number,
      friendly: number,
      skilled: number,
      postsWritten: number,
      postsViews: number,
      postsVotes: number,
      ranking: number,
      rating: number,
      numContests: number,
      maxRating: number,
      questionsWritten: number,
      numFriends: number,
      xp: number,
      streak: number,
      lastStreak: null,
      lastStreakTime: number,
      optimalPostsWritten: number,
      maxStreak: number,
      currentStreak: number,
      isFire: boolean,
      votesCast: number,
      commentsWritten: number,
      problemVotes: number,
      karmasCast: number,
      grade: number,
      experience: number,
    },
    keys: [],
    friends: number[],
    friendrequests: number[],
    profiles: [
      {
        id: number,
        userId: number,
        name: string,
        active: boolean,
        createTime: number,
      },
      {
        id: number,
        userId: number,
        name: string,
        active: boolean,
        createTime: number,
      }
    ],
    right: {
      id: number,
      userId: number,
      globalChat: boolean,
      sessionChat: boolean,
      createPublicRoom: boolean,
      maxDifficulty: number,
      joinRoom: boolean,
      isMuted: boolean,
      vetoCountdown: boolean,
      contestSetter: boolean,
      isModerator: boolean,
      canTakedown: boolean,
      hasFlair: boolean,
      writePost: boolean,
    },
    warningLevel: null,
    invites: [],
    activeRoomUniqueSlug: null,
    solved: number[],
    solvedGlobal: number[],
    submitted: number[],
    solvedToday: number,
    isOnline: boolean,
}
