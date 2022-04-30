<template>
  <div>
    <h3>Home</h3>
    <UserComponent>
      <template v-slot:user="{ user }">
        <div v-if="user">
          <UserProfile :user="user" />
          <ChatList :uid="user.uid" />
        </div>

        <LoginComponent v-else />
      </template>
    </UserComponent>
  </div>
</template>

<script>
import ChatList from "./ChatList.vue";
import LoginComponent from "./LoginComponent.vue";
import UserComponent from "./UserComponent.vue";
import UserProfile from "./UserProfile.vue";

export default {
  components: {
    UserComponent,
    UserProfile,
    LoginComponent,
    ChatList,
  },
};
</script>