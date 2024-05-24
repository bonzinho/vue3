import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/plugins/firebase.js'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),

  actions: {
    async register(values) {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      )

      await usersCollection.doc(userCredentials.user.uid).set({
        name: values.name,
        email: values.email,
        age: parseInt(values.age),
        country: values.country
      })

      await userCredentials.user.updateProfile({
        displayName: values.name
      })

      // Mutation
      this.userLoggedIn = true
    },

    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password)

      this.userLoggedIn = true
    },

    async signOut() {
      await auth.signOut()

      this.userLoggedIn = false
    }
  }
})
