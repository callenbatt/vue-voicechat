<template>
  <div
    class="message"
    :class="{ 'from-user': owner }"
  > {{ message.text }}
    <br><span class="sender">from UID {{ message.sender }}}</span>

  </div>
</template>
<script>
export default {
  props: ["owner", "message"],
};
</script>

<style scoped>
.message {
  background: #dddddd;
  color: black;
  margin-left: auto;
  margin-right: 10px;
  border-radius: 5px;
  padding: 12px;
  display: inline-block;
}
.from-user {
  margin-right: auto;
  margin-left: 10px;
  background: #91bbff;
}
.sender {
  font-size: 0.5rem;
}
</style>