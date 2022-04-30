<template>
  <aside class="section">
    <h3>Sign in Anonymously</h3>
    <button @click="auth.signInAnonymously()">Sign In</button>

    <div v-if="newUser">
      <h3>Sign up for a new account!</h3>
      <a
        href="#"
        @click="newUser = false"
      >Returning member?</a>
    </div>

    <div v-else>
      <h3>Log in to your account</h3>
      <a
        href="#"
        @click="newUser =  true"
      >New user?</a>
    </div>
    <label for="email">Email</label><br>
    <input
      v-model="email"
      type="email"
      name="email"
      placeholder="email"
      class="input"
    >
    <label for="password">Password</label><br>
    <input
      v-model="password"
      type="password"
      name="password"
      placeholder="password"
      class="input"
    >
    <br>
    <button
      class="button is-info"
      :class="{'is-loading': loading}"
      @click="signInOrCreateUser()"
    >{{newUser ? "Sign up" : "Login"}}</button>

    <p
      class="has-danger-text"
      v-if="errorMessage"
    >{{ errorMessage }}</p>
  </aside>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      auth,
      email: "",
      password: "",
      newUser: false,
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async signInOrCreateUser() {
      this.loading = true;
      this.errorMessage = "";
      try {
        if (this.newUser) {
          await this.auth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );
        } else {
          await this.auth.signInWithEmailAndPassword(this.email, this.password);
        }
      } catch (error) {
        console.error(error.message);
        this.errorMessage = error.message;
      }
      this.loading = false;
    },
  },
};
</script>
