<template>
    <div class="container">
        <img alt="Vue logo" src="../assets/logo.png" />
        <div class="top">
            <h3>{{ displayName }}さんようこそ！！</h3>
            <div>
                <h3 class="top-right">残高：{{ moneyStatus }}</h3>
                <button class="logout-btn" @click="logout()">ログアウト</button>
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
                        ><button
                            class="btn"
                            @click="clickRemittancePartnerAuthUid(user)"
                        >
                            送る
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="balance-modal" v-show="isWalletModalShow">
            <div
                class="balance-modal-overlay"
                @click="isWalletModalClose()"
            ></div>
            <div class="balance-modal-inner">
                <div class="balance-modal-inner-top">
                    <p>{{ clickUserName }}さんの残高</p>
                    <p>{{ clickUserMoney }}</p>
                </div>
                <div class="balance-modal-inner-bottom">
                    <button
                        class="balance-modal-inner-bottom-btn"
                        @click="isWalletModalClose()"
                    >
                        close
                    </button>
                </div>
            </div>
        </div>
        <div class="remittance-modal" v-show="isRemittanceModalShow">
            <div class="remittance-modal-overlay"></div>
            <div class="remittance-modal-inner">
                <div class="remittance-modal-inner-top">
                    <p>あなたの残高：{{ moneyStatus }}</p>
                    <p>送る金額</p>
                    <label>
                        <input
                            type="text"
                            name="remittance"
                            id="remittance"
                            v-model="remittanceAmount"
                        />
                    </label>
                </div>
                <div class="remittance-modal-inner-bottom">
                    <button
                        class="remittance-modal-inner-bottom-btn" @click="remittance"
                    >
                        送信
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            remittanceAmount: null,
        };
    },
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
        clickRemittancePartnerAuthUid(userData) {
            this.$store.dispatch('clickRemittancePartnerAuthUid', userData.uid);
        },
        remittance() {
            this.$store.dispatch('fetchUpDateMoney', this.remittanceAmount)
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
        isRemittanceModalShow() {
            return this.$store.getters.isRemittanceModalShow;
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

.display-name {
    margin-top: 0;
}

.main {
    width: 600px;
    margin: auto;
}

.main h3:first-of-type {
    width: 150px;
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

.balance-modal,
.remittance-modal {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.balance-modal-overlay,
.remittance-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.balance-modal-inner,
.remittance-modal-inner {
    z-index: 2;
}

.balance-modal-inner-top {
    width: 250px;
    height: 120px;
    background-color: white;
    z-index: 3;
}

.remittance-modal-inner-top {
    width: 300px;
    height: 150px;
    background-color: white;
    z-index: 3;
}

.balance-modal-inner-top p:first-of-type {
    margin-bottom: 60px;
}

.balance-modal-inner-bottom {
    width: 250px;
    height: 60px;
    background-color: rgb(189, 184, 184);
    z-index: 3;
    position: relative;
}

.remittance-modal-inner-bottom {
    width: 300px;
    height: 60px;
    background-color: rgb(189, 184, 184);
    z-index: 3;
    position: relative;
}

.balance-modal-inner-bottom-btn,
.remittance-modal-inner-bottom-btn {
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
