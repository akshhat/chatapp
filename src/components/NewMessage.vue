<template>
    <div class="new-message">
        <form @submit.prevent="addMessage">
            <input type="text" name="new-message" v-model="newMessage" class="input-message" placeholder="New Message">
            <a class="btn-floating btn-large waves-effect waves-light teal send" @click="addMessage"><i class="material-icons">send</i></a>
            <p class="red-text warning" v-if="feedback">{{ feedback }}</p>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'NewMessage',
    props: ['name'],
    data() {
        return {
            newMessage: null,
            feedback: null
        }
    },
    methods: {
        addMessage() {
            if (this.newMessage) {
                db.collection('messages').add({
                    content: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newMessage = null
                this.feedback = null
            } else {
                this.feedback = 'A new message can\'t be empty'
            }
        }
    }
}
</script>

<style>
.new-message .warning {
    font-size: 14px;
}

.new-message .send {
    position: absolute;
    top: 15%;
    right: 3%;
}

.new-message .input-message {
    max-width: 90%;
}
</style>