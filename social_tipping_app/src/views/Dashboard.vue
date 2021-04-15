<template>
    <div class="container">
        <img alt="Vue logo" src="../assets/logo.png" />
        <div class="top">
            <h3>{{ displayName }}さんようこそ！！</h3>
            <div>
                <h3 class="top-right">残高：{{ moneyStatus }}</h3>
                <button class="logout-btn" @click="logout">ログアウト</button>
            </div>
        </div>

        <div class="main">
            <h2>
                ユーザ一覧
            </h2>
            <h3>
                ユーザー名
            </h3>
            <ul>
                <li class="user-list" v-for="user in otherUsers" :key="user.id">
                    <p class="display-name">{{ user.displayName }}</p>
                    <div>
                        <button class="btn" @click="clickUserStatus(user)">
                            walletを見る</button
                        ><button class="btn">送る</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="modal" v-show="isWalletModalShow">
            <div class="modal-overlay" @click="isWalletModalClose()"></div>
            <div class="modal-inner">
                <div class="modal-inner-top">
                    <p>{{ clickUserName }}さんの残高</p>
                    <p>{{ clickUserMoney }}</p>
                </div>
                <div class="modal-inner-bottom">
                    <button
                        class="modal-inner-bottom-btn"
                        @click="isWalletModalClose()"
                    >
                        close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        this.$store.dispatch('fetchMoneyStatus');
        this.$store.dispatch('fetchOtherUserData');
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
        clickUserStatus(userData) {
            this.$store.dispatch('clickUserStatus', {
                name: userData.displayName,
                money: userData.money,
            });
        },
        isWalletModalClose() {
            this.$store.commit('setIsWalletModalShow', false);
        },
    },

    computed: {
        displayName() {
            return this.$store.getters.displayName;
        },
        moneyStatus() {
            return this.$store.getters.moneyStatus;
        },
        otherUsers() {
            return this.$store.getters.otherUserData;
        },
        clickUserName() {
            return this.$store.getters.clickUserName;
        },
        clickUserMoney() {
            return this.$store.getters.clickUserMoney;
        },
        isWalletModalShow() {
            return this.$store.getters.isWalletModalShow;
        },
    },
};
</script>
<style scoped>

.container {
    width: 1100px;
    margin: auto;
    padding-top: 50px;
}

.top {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
}

.top h3:first-of-type {
    margin-top: 0px;
}

.user-list {
    display: flex;
    justify-content: space-between;
}

.display-name{
    margin-top: 0;
}

.main {
    width: 600px;
    margin: auto;
}

.main h3:first-of-type {
    width:150px;
    margin-right: auto;
}

h2 {
    font-size: 50px;
    font-weight: 200;
    margin-top: 32px;
}

.btn {
    color: white;
    background-color: rgb(68, 161, 201);
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
    border-color: white;
    border-style: none;
}

.logout-btn {
    color: rgb(55, 159, 219);
    font-size: 10px;
    border: solid 1px rgb(55, 159, 219);
    padding: 3px 7px;
    background-color: white;
    border-radius: 5px;
    transition: all 0.5s;
}

.logout-btn:hover {
    color: white;
    background-color: rgb(55, 159, 219);
}

.top-right {
    display: inline;
    margin-right: 20px;
}

.top-top {
    vertical-align: center;
}

.modal {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.modal-inner {
    z-index: 2;
}

.modal-inner-top {
    width: 250px;
    height: 120px;
    background-color: white;
    z-index: 3;
}

.modal-inner-top p:first-of-type {
    margin-bottom: 60px;
}

.modal-inner-bottom {
    width: 250px;
    height: 60px;
    background-color: rgb(189, 184, 184);
    z-index: 3;
    position: relative;
}

.modal-inner-bottom-btn {
    display: inline-block;
    color: honeydew;
    font-size: 18px;
    background-color: rgb(243, 84, 84);
    position: absolute;
    top: 25%;
    right: 10%;
    padding: 3px 10px;
    border: none;
}
</style>
