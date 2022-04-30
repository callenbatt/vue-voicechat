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
          > {{message.text}}
          </li>
        </ul>

        <input
          v-model="newMessageText"
          class="input"
          type="text"
          name="newMessageText"
          id=""
        >

        <button
          :disabled="!newMessageText || loading"
          class="button is-success"
          @click="addMessage(user.uid)"
        >send</button>
      </template>
    </UserComponent>
  </main>
</template>
<script>
import { db } from "../firebase";
import UserComponent from "../components/UserComponent.vue";

export default {
  components: {
    UserComponent,
  },
  data() {
    return {
      newMessageText: "",
      loading: false,
      messages: [],
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
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

      const { id: messageId } = this.messagesCollection.doc();

      await this.messagesCollection.doc(messageId).set({
        text: this.newMessageText,
        sender: uid,
        createdAt: Date.now(),
      });
      this.loading = false;
      this.newMessageText = "";
    },
  },
};
</script>