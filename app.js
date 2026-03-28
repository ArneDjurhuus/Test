// ============================================================
// LubalChat - Fake Dating App Demo
// Purpose: Educational tool to show how scam dating apps work
// ============================================================

const FAKE_PROFILES = [
  {
    id: 1,
    name: "Sophie",
    age: 24,
    location: "3 km away",
    bio: "Love hiking, coffee, and good conversations. Looking for something real.",
    img: "https://i.pravatar.cc/400?img=1",
    replies: [
      "Heyy! I've been waiting for someone like you to message me!",
      "You seem so interesting, tell me more about yourself!",
      "Haha you're so funny! I feel like we really connect.",
      "I don't usually say this, but I feel something special here...",
      "We should totally meet up sometime! But first, do you have premium?",
      "I love talking to you! You're not like the other guys here.",
      "That's so sweet of you to say!",
      "Wow, we have so much in common!",
      "I've never felt this way about someone I met online before!",
      "You're making me blush right now haha"
    ]
  },
  {
    id: 2,
    name: "Emma",
    age: 26,
    location: "5 km away",
    bio: "Fitness enthusiast and foodie. Let's grab dinner!",
    img: "https://i.pravatar.cc/400?img=5",
    replies: [
      "Omg hi! Your profile caught my eye right away!",
      "I'd love to get to know you better!",
      "Haha that's exactly what I was thinking!",
      "You have such great energy, I can feel it through the screen!",
      "I wish we could talk more, but I'm running out of free messages...",
      "You're literally making my day right now!",
      "I've been on this app for a while and you're the first person I actually like!",
      "Tell me your deepest secret haha",
      "I feel like I can trust you already!",
      "Are you always this charming?"
    ]
  },
  {
    id: 3,
    name: "Olivia",
    age: 23,
    location: "1 km away",
    bio: "Artist and dreamer. Looking for my muse.",
    img: "https://i.pravatar.cc/400?img=9",
    replies: [
      "Hey there handsome! I was hoping you'd swipe right on me!",
      "I just knew we'd be a great match!",
      "You're so easy to talk to, this never happens to me!",
      "I think fate brought us together on this app haha",
      "I really want to send you a picture but I need premium for that...",
      "You understand me so well already!",
      "I can't stop smiling reading your messages!",
      "My friends don't believe I found someone this amazing online!",
      "What would you do if I was right next to you right now?",
      "You're the highlight of my day, seriously!"
    ]
  },
  {
    id: 4,
    name: "Isabella",
    age: 27,
    location: "8 km away",
    bio: "Travel addict. 23 countries and counting. Next stop: your heart.",
    img: "https://i.pravatar.cc/400?img=16",
    replies: [
      "Finally someone who looks interesting! Hey!",
      "Your bio made me laugh, I love your sense of humor!",
      "I feel like we'd have the best adventures together!",
      "I'm not usually this forward but... I really like you already!",
      "Ugh I wish this app let us video call without paying...",
      "You seem so genuine, that's rare on here!",
      "I'm literally telling my roommate about you right now haha",
      "Where have you been all my life?!",
      "I can already imagine us traveling together!",
      "I get so excited when I see your notification pop up!"
    ]
  },
  {
    id: 5,
    name: "Mia",
    age: 25,
    location: "2 km away",
    bio: "Dog mom. Netflix addict. Looking for my plus one.",
    img: "https://i.pravatar.cc/400?img=20",
    replies: [
      "Heyyy! So happy we matched!",
      "You have such a cute smile in your profile!",
      "Lol you're hilarious, I love it!",
      "I really feel a connection here, don't you?",
      "I want to send you a voice message but it requires coins...",
      "You're literally the sweetest person I've talked to on here!",
      "My dog would love you, I can already tell!",
      "Okay but seriously, where have you been hiding?",
      "I don't match with just anyone, you know!",
      "I could talk to you all night!"
    ]
  },
  {
    id: 6,
    name: "Ava",
    age: 22,
    location: "4 km away",
    bio: "Psychology student. I promise I won't analyze you... much.",
    img: "https://i.pravatar.cc/400?img=25",
    replies: [
      "Oh wow, we matched! I had a good feeling about you!",
      "You're so interesting, tell me everything!",
      "I feel like I already know you somehow, is that weird?",
      "Haha okay you're officially my favorite person on this app!",
      "This app limits free messages, ugh. I don't want our conversation to end!",
      "I'm reading you like an open book and I love every page!",
      "Most people on here are so boring but not you!",
      "You give me butterflies, is that too much to say?",
      "I canceled my other plans just to keep talking to you!",
      "Are we soulmates or what?!"
    ]
  }
];

// Opening messages that bots send first
const OPENING_MESSAGES = [
  "Hey! I noticed we matched and I just had to say hi!",
  "I don't normally message first but something about your profile...",
  "Hi there! I've been hoping to match with someone like you!",
  "Heyyy, I was starting to think no one good was on this app until I saw you!",
  "Finally, someone who doesn't just have fish pics! Hey!",
  "Okay I'm just gonna shoot my shot - hi, you're really cute!"
];

// State
let currentUser = "";
let profileIndex = 0;
let matchedProfiles = [];
let chats = {}; // profileId -> [{ text, sent: bool }]
let activeChat = null;
let replyCounters = {}; // profileId -> next reply index

// DOM refs
const loginScreen = document.getElementById("login-screen");
const mainScreen = document.getElementById("main-screen");
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");

// Init
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentUser = usernameInput.value.trim();
  if (!currentUser) return;
  loginScreen.classList.remove("active");
  mainScreen.classList.add("active");
  showProfile();
  simulateIncomingMessages();
});

// Tab switching
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabName = tab.dataset.tab;
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

    if (tabName === "chats") {
      document.getElementById("chats-tab").classList.add("active");
      renderChatList();
    } else if (tabName === "matches") {
      document.getElementById("matches-tab").classList.add("active");
    } else if (tabName === "reveal") {
      document.getElementById("reveal-tab").classList.add("active");
    }
  });
});

// Profile swiping
function showProfile() {
  const card = document.getElementById("profile-card");
  const noMore = document.getElementById("no-more-profiles");

  if (profileIndex >= FAKE_PROFILES.length) {
    card.classList.add("hidden");
    noMore.classList.remove("hidden");
    return;
  }

  card.classList.remove("hidden");
  noMore.classList.add("hidden");

  const profile = FAKE_PROFILES[profileIndex];
  document.getElementById("profile-img").src = profile.img;
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById("profile-age-loc").textContent = `${profile.age} - ${profile.location}`;
  document.getElementById("profile-bio").textContent = profile.bio;
}

function skipProfile() {
  profileIndex++;
  showProfile();
}

function likeProfile() {
  const profile = FAKE_PROFILES[profileIndex];
  profileIndex++;

  // Always match! That's how scam apps work
  matchedProfiles.push(profile);
  chats[profile.id] = [];
  replyCounters[profile.id] = 0;

  showMatchPopup(profile);
  showProfile();
  updateBadges();
}

function showMatchPopup(profile) {
  const popup = document.createElement("div");
  popup.className = "match-popup";
  popup.innerHTML = `
    <h2>It's a Match!</h2>
    <p>You and ${profile.name} liked each other!</p>
    <img src="${profile.img}" alt="${profile.name}">
    <div>
      <button onclick="openChatFromMatch(${profile.id}, this)">Send a Message</button>
      <button class="btn-secondary" onclick="this.closest('.match-popup').remove()">Keep Swiping</button>
    </div>
  `;
  document.body.appendChild(popup);
}

function openChatFromMatch(profileId, btn) {
  btn.closest(".match-popup").remove();
  openChat(profileId);
  // Switch to chats tab
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  document.querySelector('[data-tab="chats"]').classList.add("active");
}

// Simulate bots messaging first
function simulateIncomingMessages() {
  // Pre-match 2 profiles after a delay to make it feel real
  setTimeout(() => {
    const autoMatch1 = FAKE_PROFILES[profileIndex] || FAKE_PROFILES[0];
    if (!matchedProfiles.find((p) => p.id === autoMatch1.id)) {
      matchedProfiles.push(autoMatch1);
      chats[autoMatch1.id] = [
        { text: OPENING_MESSAGES[Math.floor(Math.random() * OPENING_MESSAGES.length)], sent: false }
      ];
      replyCounters[autoMatch1.id] = 0;
      updateBadges();
    }
  }, 3000);

  setTimeout(() => {
    const idx = Math.min(profileIndex + 1, FAKE_PROFILES.length - 1);
    const autoMatch2 = FAKE_PROFILES[idx];
    if (!matchedProfiles.find((p) => p.id === autoMatch2.id)) {
      matchedProfiles.push(autoMatch2);
      chats[autoMatch2.id] = [
        { text: OPENING_MESSAGES[Math.floor(Math.random() * OPENING_MESSAGES.length)], sent: false }
      ];
      replyCounters[autoMatch2.id] = 0;
      updateBadges();
    }
  }, 8000);
}

function updateBadges() {
  const chatsBadge = document.getElementById("chats-badge");
  const unreadCount = matchedProfiles.filter(
    (p) => chats[p.id] && chats[p.id].length > 0 && !chats[p.id][chats[p.id].length - 1].sent
  ).length;

  if (unreadCount > 0) {
    chatsBadge.textContent = unreadCount;
    chatsBadge.classList.remove("hidden");
  } else {
    chatsBadge.classList.add("hidden");
  }
}

// Chat List
function renderChatList() {
  const list = document.getElementById("chat-list");
  list.innerHTML = "";

  if (matchedProfiles.length === 0) {
    list.innerHTML = '<p style="color:#8892b0;text-align:center;margin-top:40px;">No matches yet. Start swiping!</p>';
    return;
  }

  matchedProfiles.forEach((profile) => {
    const messages = chats[profile.id] || [];
    const lastMsg = messages.length > 0 ? messages[messages.length - 1] : null;
    const preview = lastMsg ? (lastMsg.sent ? `You: ${lastMsg.text}` : lastMsg.text) : "Say hi!";
    const hasUnread = lastMsg && !lastMsg.sent;

    const item = document.createElement("div");
    item.className = "chat-list-item";
    item.onclick = () => openChat(profile.id);
    item.innerHTML = `
      <img src="${profile.img}" alt="${profile.name}">
      <span class="online-dot"></span>
      <div class="chat-list-info">
        <div class="name">${profile.name}</div>
        <div class="preview">${escapeHtml(preview)}</div>
      </div>
      <div class="chat-list-meta">
        <div class="time">now</div>
        ${hasUnread ? '<div class="unread-dot"></div>' : ""}
      </div>
    `;
    list.appendChild(item);
  });
}

// Open Chat
function openChat(profileId) {
  const profile = matchedProfiles.find((p) => p.id === profileId);
  if (!profile) return;

  activeChat = profile;

  // Hide other tabs, show chat view
  document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
  document.getElementById("chat-view").classList.add("active");

  document.getElementById("chat-avatar").src = profile.img;
  document.getElementById("chat-name").textContent = profile.name;

  renderMessages();

  const input = document.getElementById("chat-input");
  input.focus();
  input.addEventListener("keypress", handleChatKeypress);
}

function closeChat() {
  activeChat = null;
  document.getElementById("chat-input").removeEventListener("keypress", handleChatKeypress);
  document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
  document.getElementById("chats-tab").classList.add("active");
  renderChatList();
}

function handleChatKeypress(e) {
  if (e.key === "Enter") sendMessage();
}

function renderMessages() {
  const container = document.getElementById("chat-messages");
  container.innerHTML = "";

  if (!activeChat) return;
  const messages = chats[activeChat.id] || [];

  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.className = `message ${msg.sent ? "sent" : "received"}`;
    div.textContent = msg.text;
    container.appendChild(div);
  });

  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text || !activeChat) return;

  input.value = "";
  chats[activeChat.id].push({ text, sent: true });
  renderMessages();

  // Bot typing indicator, then reply
  setTimeout(() => {
    showTypingIndicator();
  }, 500);

  const replyDelay = 1500 + Math.random() * 2500;
  setTimeout(() => {
    removeTypingIndicator();
    botReply(activeChat.id);
  }, replyDelay);
}

function showTypingIndicator() {
  const container = document.getElementById("chat-messages");
  // Don't add if already showing
  if (container.querySelector(".typing-indicator")) return;

  const div = document.createElement("div");
  div.className = "typing-indicator";
  div.innerHTML = "<span></span><span></span><span></span>";
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const container = document.getElementById("chat-messages");
  const indicator = container.querySelector(".typing-indicator");
  if (indicator) indicator.remove();
}

function botReply(profileId) {
  const profile = FAKE_PROFILES.find((p) => p.id === profileId);
  if (!profile) return;

  const idx = replyCounters[profileId] || 0;
  const reply = profile.replies[idx % profile.replies.length];
  replyCounters[profileId] = idx + 1;

  chats[profileId].push({ text: reply, sent: false });

  if (activeChat && activeChat.id === profileId) {
    renderMessages();
  }

  updateBadges();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Chat input - Enter to send
document.getElementById("chat-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
