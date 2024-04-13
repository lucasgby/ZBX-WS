export interface Result {
  result: Data[];
}

export interface Data {
  id:                             ID;
  labels:                         any[];
  lastReceivedKey:                LastReceivedKey;
  t:                              number;
  unreadCount:                    number;
  unreadDividerOffset:            number;
  archive?:                       boolean;
  isReadOnly:                     boolean;
  isAnnounceGrpRestrict:          boolean;
  muteExpiration:                 number;
  isAutoMuted:                    boolean;
  name?:                          string;
  notSpam?:                       boolean;
  pin?:                           number;
  ephemeralDuration?:             number;
  unreadMentionCount?:            number;
  hasUnreadMention:               boolean;
  archiveAtMentionViewedInDrawer: boolean;
  hasChatBeenOpened:              boolean;
  tcToken:                        null;
  tcTokenTimestamp?:              null;
  endOfHistoryTransferType?:      number;
  pendingInitialLoading:          boolean;
  celebrationAnimationLastPlayed: number;
  hasRequestedWelcomeMsg:         boolean;
  msgs:                           null;
  kind:                           string;
  isGroup:                        boolean;
  contact:                        Contact;
  groupMetadata:                  GroupMetadata;
  presence:                       Presence;
  isOnline:                       null;
  lastSeen:                       null;
  pendingMsgs?:                   boolean;
  unreadMentionsOfMe?:            any[];
  unreadEditTimestampMs?:         number;
}

export interface Contact {
  id:                       ID;
  name:                     string;
  type:                     string;
  isBusiness:               boolean;
  isEnterprise:             boolean;
  isSmb:                    boolean;
  labels:                   any[];
  textStatusLastUpdateTime: number;
  isUser:                   boolean;
  profilePicThumbObj:       ProfilePicThumbObj;
  msgs:                     null;
}

export interface ID {
  server:      Server;
  user:        string;
  _serialized: string;
}

export enum Server {
  CUs = "c.us",
  GUs = "g.us",
}

export interface ProfilePicThumbObj {
  eurl: null;
  id:   ID;
  tag:  null;
}

export interface GroupMetadata {
  id:                            ID;
  creation:                      number;
  owner?:                        ID;
  subject:                       string;
  subjectTime:                   number;
  descTime:                      number;
  restrict:                      boolean;
  announce:                      boolean;
  noFrequentlyForwarded:         boolean;
  ephemeralDuration:             number;
  membershipApprovalMode:        boolean;
  memberAddMode:                 string;
  reportToAdminMode:             boolean;
  size:                          number;
  support:                       boolean;
  suspended:                     boolean;
  terminated:                    boolean;
  uniqueShortNameMap:            UniqueShortNameMap;
  isLidAddressingMode:           boolean;
  isParentGroup:                 boolean;
  isParentGroupClosed:           boolean;
  defaultSubgroup:               boolean;
  generalSubgroup:               boolean;
  generalChatAutoAddDisabled:    boolean;
  allowNonAdminSubGroupCreation: boolean;
  lastActivityTimestamp:         number;
  lastSeenActivityTimestamp:     number;
  incognito:                     boolean;
  participants:                  Participant[];
  pendingParticipants:           any[];
  pastParticipants:              any[];
  membershipApprovalRequests:    any[];
  subgroupSuggestions:           any[];
  desc?:                         string;
  descId?:                       string;
  descOwner?:                    ID;
}

export interface Participant {
  id:           ID;
  isAdmin:      boolean;
  isSuperAdmin: boolean;
}

export interface UniqueShortNameMap {
}

export interface LastReceivedKey {
  fromMe:      boolean;
  remote:      ID;
  id:          string;
  participant: ID;
  _serialized: string;
}

export interface Presence {
  id:         ID;
  chatstates: Chatstate[];
}

export interface Chatstate {
  id: ID;
}