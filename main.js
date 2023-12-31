const attackValue = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
Vue.createApp({
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw"
            } if (value >= this.monsterHealth && this.monsterHealth <= 0) {
                this.winner = "player"
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw"
            } if (value >= this.playerHealth && this.playerHealth <= 0) {
                this.winner = "monster"
            }
        }
    },
    computed: {
        playerHealthStyle() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: this.playerHealth + '%' };
            }
        },
        monsterHealthStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: this.monsterHealth + '%' };
            }
        },
        prowerAttackMode() {
            return this.attackCount % 3 != 0;
        }
    },

    data() {
        return {
            Welcometext: "Welcome to Attack Game",
            monsterHealth: 100,
            playerHealth: 100,
            attackCount: 0,
            winner: null,
            fightLog: [],
            vewLog: false
        }
    },
    methods: {
        addToLog(attacker, did, value) {
            this.fightLog.unshift({
                actiomBy: attacker,
                actionType: did,
                actionValue: value
            })
        },
        monsterMove(max, min) {
            let attackrange = attackValue(max, min)
            this.playerHealth -= attackrange
            this.addToLog("Monster", "attacked to the player", attackrange)
            console.log("Monster attack player health now:", this.playerHealth)
        },
        playerMove(e) {
            let attackVal = e.target.value
            switch (attackVal) {
                case "Attack":
                    console.log("NormalAttack")
                    this.monsterHealth -= attackValue(8, 12)
                    this.addToLog("Player", "did Normal Attack to monster +", attackValue(8, 12))
                    this.monsterMove(10, 15)
                    this.attackCount++;
                    break;
                case "Power Attack":
                    console.log("Power Attack")
                    this.monsterHealth -= attackValue(20, 25)
                    this.addToLog("Player", "did Power Attack to monster +", attackValue(20, 25))
                    this.monsterMove(10, 15)
                    this.attackCount++;
                    break;
                case "Heal":
                    this.attackCount++;
                    if (this.playerHealth + attackValue(30, 20) > 100) {
                        this.playerHealth = 100;
                        this.addToLog("Player-healed", "With +", attackValue(30, 20))
                    } else {
                        this.playerHealth += attackValue(30, 20)
                        this.addToLog("Player-healed", "With +", attackValue(30, 20))
                    }
                    this.monsterMove(10, 15)
                    break;
                case "Surrender":
                    this.playerHealth = 0
                    this.monsterHealth = 100
                    this.winner = "monster"
                    this.addToLog("Player-Surrender", "now health is", "0")
                    console.log("Surrender")
                    break;
                case "View fight Log":
                    this.vewLog = !this.vewLog
                    console.log("clisk")
                    break;
                case "Restart game":
                    this.monsterHealth = 100
                    this.playerHealth = 100
                    this.attackCount = 0
                    this.winner = null
                    this.fightLog = []
                    this.vewLog = false
                    console.log("Restart game")
                    break;
                default:
                    break;
            }
        }
    },
}).mount("#App");