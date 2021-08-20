<template>
  <div class="home">
    <Admin />
  </div>
</template>

<script>
// @ is an alias to /src
import Admin from '@/views/Admin.vue'

export default {
  name: 'Home',
  components: {
    Admin
  }
}
</script>
