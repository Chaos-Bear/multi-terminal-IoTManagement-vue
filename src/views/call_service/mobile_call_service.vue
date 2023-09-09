<template>
    <div>
        <div>
            当前用户:
            <el-input v-model="userInfo.userName"/>
            当前会议室:
            <el-input v-model="chatMessages.roomName"/>
            当前会议室Id:
            <el-input v-model="chatMessages.roomId"/>
            当前会议室会议id:
            <el-input v-model="chatMessages.meetingId"/>
        </div>
        <div style="">
            <el-button style="margin-left: 10px;" @click="toRouter('/home')">返回</el-button>
            <el-button disabled type="primary" style="float: right;" @click="openMeetingChat">手动更新会议</el-button>
        </div>
        <div style="background-color: #02275E;">
            <el-scrollbar class="custom-el-scrollbar" ref="scrollbarRef" always>
                <div class="call_service_msg_area">
                    <template v-if="chatMessages.data.length > 0">
                        <template v-for="obj2 in chatMessages.data">
                            <template v-if="obj2.name !== userInfo.userName">
                                <div class="call_service_chat_messages">
                                    <div class="call_service_chat"
                                         style="border-radius: 0 20px 20px 20px;">
                                        <span> {{ obj2.msg }} </span>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="call_service_chat_messages"
                                     style="justify-content: flex-end;right: 20px;">
                                    <div class="call_service_chat"
                                         style="border-radius: 20px 0 20px 20px;right: 20px;">
                                        <span> {{ obj2.msg }} </span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </template>
                    <template v-else>
                        <div style="text-align: center;">
                            <span style="color: rgba(255,255,255,0.4);width: 290px;">
                                暂无记录
                            </span>
                        </div>
                    </template>
                </div>
            </el-scrollbar>
            <el-divider style="width: 1000px;left: -20px;border-color: #075B8C;"/>
            <div>
                <el-button color="#16D0FF" style="height: 40px;width: 128px;">
                    <ChatDotRound
                            style="width: 30px; height: 30px; margin-right: 8px;color: white;transform: rotateY(180deg);"/>
                    <span
                            style="font-size: 18px;color: rgba(255, 255, 255, 1);">常用语</span>
                </el-button>
                <el-input @change="sendChatMsg" v-model="msgInfo" class="call_service_input_msg"
                          size="large"
                          placeholder="新信息"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import axios from "axios";
import {onDeactivated, onMounted, reactive, ref} from "vue";
// import {io} from "socket.io-client";
import {ChatDotRound} from "@element-plus/icons-vue";

const socket = io('http://127.0.0.1:3600/');
// 当前用户
const userInfo = reactive({
    userId: '1111111',
    userName: 'aaaa',
})
// 需要发送的消息
const msgInfo = ref('')
const router = useRouter()
const toRouter = (path) => {
    if (path) {
        router.push({
            path: path
        })
    }
}


const chatMessages = reactive({
    roomName: 'A2-227',
    meetingId: '8803044486774784',
    roomId: '8646082070315008',
    userId: userInfo.userId,
    userName: userInfo.userName,
    data: []
})

// 获取当前会议室所有聊天信息
socket.emit('call-service-chats-user-get', {
    userId: userInfo.userId,
    roomId: chatMessages.roomId,
    meetingId: chatMessages.meetingId,
}, async (data) => {
    console.log(data);
    data.data.map((val) => {
        chatMessages.data.push({
            name: val['user_name'],
            msg: val.chat,
            time: val.time
        })
    })
});

const sendChatMsg = () => {
    socket.emit('call-service-chats-add', {
        roomId: chatMessages.roomId,
        roomName: chatMessages.roomName,
        meetingId: chatMessages.meetingId,
        userId: userInfo.userId,
        userName: userInfo.userName,
        chat: msgInfo.value
    }, (data) => {
        console.log(data);
        if (data.success) {
            chatMessages.data.push({
                name: data.data['userName'],
                msg: data.data.chat,
                time: data.data.time
            })
            msgInfo.value = ''
        }
    });
}

socket.on('call-service-chats-need-update', (data) => {
    console.log('call-service-chats-need-update');
    console.log(data);
    chatMessages.data.push({
        name: data['userName'],
        msg: data.chat,
        time: data.time
    })
});
const openMeetingChat = () => {
    // 更新数据表的会议
    axios.post('/api/call-service-base/updateMeetingInfo', {}).then(res => res.json).then((r) => {
        console.log(r);
    })
}
onMounted(() => {
    //连接socket服务器
    socket.connect();
});

onDeactivated(() => {
    socket.close()
})
</script>

<style scoped>

.call_service_msg_area {
    height: 600px;
}

.call_service_floor_span {
    margin: 0 10px;
    color: #ffffff;
}

:deep(.call_service .el-collapse-item__header) {
    background-color: #022151;
    color: #ffffff;
    border-color: #022151;
    font-size: 20px;
}

:deep(.call_service .el-collapse-item__content) {
    background-color: #022151;
    border-color: #022151;
}

:deep(.call_service .el-collapse) {
    border-color: #022151;
}

:deep(.call_service .el-collapse-item__wrap) {
    border-color: #022151;
}

.call_service_chat_messages {
    color: white;
    margin-bottom: 28px;
    position: relative;
    min-height: 60px;
    margin-top: 25px;
    font-size: 18px;
    word-break: break-all;
    display: flex;
}

.call_service_chat {
    max-width: 400px;
    background-color: rgba(255, 255, 255, 0.06);
    padding: 18px 18px;
}

:deep(.custom-el-scrollbar.el-scrollbar) {
    height: 600px;
}

:deep(.call_service_input_msg) {
    display: inline-flex;
    margin-left: 20px;
    width: 700px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
}

:deep(.call_service_input_msg .el-input__wrapper) {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
}

:deep(.call_service_input_msg .el-input__inner) {
    color: white;
    caret-color: rgba(255, 255, 255, 1);
}
</style>