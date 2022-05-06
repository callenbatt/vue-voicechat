<template>
  <main>
    <h3>
      Welcome to Chat Room {{chatId}}
    </h3>
    <UserComponent>
      <template #user="{ user }">
        <ul>
          <li
            v-for="message of messages"
            :key="message.id"
          >
            <ChatMessage
              :message="message"
              :owner="user.uid === message.sender"
            />
          </li>
        </ul>

        <input
          v-model="newMessageText"
          class="input"
          type="text"
          name="newMessageText"
          id=""
        >
        <hr>

        <h5> Record Audio </h5>
        <button
          class="button is-info"
          v-if="!recorder"
          @click="record()"
        >Record</button>
        <button
          class="button is-danger"
          v-else
          @click="stop()"
        >Stop</button>

        <audio
          v-if="newAudio"
          :src="newAudioUrl"
          controls
        ></audio>

        <button
          :disabled="(!newMessageText && !newAudio) || loading"
          class="button is-success"
          @click="addMessage(user.uid)"
        >send</button>
      </template>
    </UserComponent>
  </main>
</template>
<script>
import { db, storage } from "../firebase";
import UserComponent from "./UserComponent.vue";
import ChatMessage from "./ChatMessage.vue";

export default {
  components: {
    UserComponent,
    ChatMessage,
  },
  data() {
    return {
      newMessageText: "",
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
    newAudioUrl() {
      return URL.createObjectURL(this.newAudio);
    },
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy("createdAt").limitToLast(10),
    };
  },
  methods: {
    async addMessage(uid) {
      this.loading = true;
      let audioURL = null;
      const { id: messageId } = this.messagesCollection.doc();

      if (this.newAudio) {
        const storageRef = storage
          .ref("chats")
          .child(this.chatId)
          .child(`${messageId}.wav`);
        await storageRef.put(this.newAudio);
        audioURL = await storageRef.getDownloadURL();
      }

      await this.messagesCollection.doc(messageId).set({
        text: this.newMessageText,
        sender: uid,
        createdAt: Date.now(),
        audioURL,
      });
      this.loading = false;
      this.newMessageText = "";
      audioURL = null;
    },

    async record() {
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      const options = { mimeType: "audio/webm" };

      const recordedChunks = [];
      this.recorder = new MediaRecorder(stream, options);
      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      });
      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks);
      });

      this.recorder.start();
    },

    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background: #efefef;
  padding: 10px;
  border-radius: 0;
}
li {
  display: flex;
}
</style>