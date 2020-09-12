<template>
    <div class="chat container">
        <h2 class="center white-text">ChatApp</h2>
        <div class="card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id" :class="[ isPerson(message.name) ? 'teal lighten-1 my-text' : 'grey lighten-4']" class="card">
                        <span class="white-text name" v-if="message.name === name">You</span>
                        <span class="teal-text name" v-else>{{ message.name }}</span>
                        <span :class="[ isPerson(message.name) ? 'black-text' : 'grey-text text-darken-3']" class="message">{{ message.content }}</span>
                        <span :class="[ isPerson(message.name) ? 'white-text' : 'grey-text text-darken-3']" class="time">{{ message.timestamp }}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name="name" />
            </div>
        </div>
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'Chat',
    props: ['name'],
    components: {
        NewMessage
    },
    data() {
        return {
            messages: []
        }
    },
    methods: {
        isPerson(person) {
            return person === this.name
        }
    },
    created() {
        let ref = db.collection('messages').orderBy('timestamp')

        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added') {
                    let doc = change.doc
                    this.messages.push({
                        id: doc.id,
                        name: doc.data().name,
                        content: doc.data().content,
                        timestamp: moment(doc.data().timestamp).format('lll')
                    })
                }
            })
        })
    }
}
</script>

<style>

.chat .card {
    border-radius: 12px;
}

.chat h2 {
    font-size: 2.6em;
    margin-bottom: 40px;
}

.chat span {
    display: block;
}

.chat .message {
    font-size: 1.2em;
}


.chat .time {
    font-size: 0.8em;
}

.chat .card-action {
    border-radius: 0 0 12px 12px !important;
}

.chat .messages li {
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 10px 30px;
    margin-left: 4px;
    margin-right: 4px;
}

.messages {
    max-height: 300px;
    overflow: auto;
}

.messages .my-text {
    max-height: 300px;
    overflow: auto;
    text-align: right;
}

.messages::-webkit-scrollbar {
    width: 3px;
}

.messages::-webkit-scrollbar-track {
    background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
    background: #aaa;
}
</style>