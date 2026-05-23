<template>
    <div class="settings">
        <h1>Settings</h1>
        <div class="line">
          <span class="label">Hue</span>
          <input type="range" min="0" max="360" v-model="settings.hue" @change="updateHue">
        </div>

        <div class="line">
          <span class="label">Language Name</span>
          <input type="text" v-model="settings.name" @change="updateName"> 
        </div>

        <div class="line">
          <span class="Word Count">Word Count</span>
          <span>{{ Object.keys(dictionary).length }}</span>
        </div>

        <form v-if="currentUser == null" class="signin">

          <div class="line email">
            <span class="label">Email</span>
            <input type="email" v-model="email" required>
          </div>

          <div class="line password">
            <span class="label">Password</span>
            <input type="password" minlength="6" v-model="password" required>
          </div>

          <button class="signin-btn" @click.prevent="signin">Sign In</button>
          <button class="signup-btn" @click.prevent="signup">Sign Up</button>
          <!-- <button class="with-google">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
          </button> -->

        </form>
        <div v-else class="user-info">
          <span>Signed in as: {{ currentUser.email }}</span>
          <button @click="signout">Sign Out</button>
        </div>
  </div> 
</template>

<script>
import { settings, updateHue, updateName, clearSave } from '../save.js'
import { ref } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, currentUser } from '@/firebase.js';
import { dictionary } from '@/Dictionary/dictionary.js';


  export default {
    setup() {      
      const email = ref('')
      const password = ref('')

      const signout = () => {
        signOut(auth)
        .then(() => {
          currentUser.value = null
          clearSave()
        })
        .catch(error => {
          alert('There was an error while signing out')
          console.error(error.code)
        })
      }

      const signup = () => {

        createUserWithEmailAndPassword(auth, email.value.trim(), password.value.trim())
        .then(() => {
          currentUser.value = auth.currentUser
        })
        .catch(error => {
          console.error(error)
          let message = ''
          switch (error.code) {
            case 'auth/email-already-in-use':
              message = 'That email is already being used'
              break
            default:
              message = 'An error occured'
              break
          } 
          alert(message)
        })

        email.value = ''
        password.value = ''
      }

      const signin = async () => {
        try {
          currentUser.value = (await signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim())).user
        } catch (error) {
          if (error.code == 'auth/invalid-credential') {
            alert('Wrong email or password')
          }
        }
        email.value = ''
        password.value = ''
      }

      return {
        settings, email, password, currentUser, dictionary,
        updateHue, updateName, signup, signin, signout
      }
    }
  }

</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  gap: 10px;
}

span {
  font-size: 1.5rem;
}

.label {
  white-space: nowrap;
}

.toggle {
  transition: all 0.3s ease;
  border: 2px solid var(--accent-color);
  padding: 5px;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.toggle.on {
  background-color: var(--accent-color);
}

.line {
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content; 
  accent-color: var(--accent-color);
  gap: 20px;
}

input[type="text"] {
  font-size: 1rem;
}

.signin {
  border: 4px solid var(--sidebar-active);
  border-radius: 0.5rem;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.signin, .user-info {
  margin-top: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.email {
  grid-row: 1;
  grid-column: 1 / 3;
}


.password {
  grid-row: 2;
  grid-column: 1 / 3;
}

button {
  transition: all 0.3s ease;
  border: 2px solid var(--accent-color);
  background-color: var(--bg-color);
  color: white;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signin-btn {
  grid-row: 1;
  grid-column: 3 / 5;
}

.signup-btn {
  grid-row: 2;
  grid-column: 3 / 5;
}

/* .with-google {
  grid-row: 1 / 3;
} */

button:hover {
  background-color: var(--sidebar-active);
}

svg {
  width: 2rem;
  height: 2rem;
}
</style>