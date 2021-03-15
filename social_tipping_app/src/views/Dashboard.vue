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
            <table>
                <caption>
                    ユーザ一覧
                </caption>
                <colgroup span="1" class="col-1"></colgroup>
                <colgroup span="1" class="col-2"></colgroup>
                <tr>
                    <th>ユーザ名</th>
                    <th></th>
                </tr>
                <tr>
                    <td align="center">テスト</td>
                    <td align="right">
                        <button class="btn">walletを見る</button
                        ><button class="btn">送る</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        this.$store.dispatch('getMoneyStatus');
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
    },
    computed: {
        displayName() {
            return this.$store.getters.displayName;
        },
        moneyStatus() {
            return this.$store.getters.moneyStatus;
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
}

.main {
    width: 600px;
    margin: auto;
}
table {
    width: 100%;
}

caption {
    font-size: 80px;
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

.col-1 {
    width: 15%;
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
</style>
