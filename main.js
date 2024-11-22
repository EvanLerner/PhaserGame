import "./style.css";
import Phaser from 'phaser'
import * as animalCreator from "./animalCreator.js"

const tickerSyms = ["AA", "AACG", "AACT", "AADI", "AAL", "AAM", "AAME", "AAOI", "AAON", "AAP", "AAPL", "AAT", "AB", "ABAT", "ABBV", "ABCB", "ABCL", "ABEO", "ABEV", "ABG", "ABL", "ABLV", "ABM", "ABNB", "ABOS", "ABR", "ABSI", "ABT", "ABTS", "ABUS", "ABVC", "ABVE", "ABVX", "AC", "ACA", "ACAD", "ACB", "ACCD", "ACCO", "ACDC", "ACEL", "ACET", "ACGL", "ACHC", "ACHL", "ACHR", "ACHV", "ACI", "ACIC", "ACIU", "ACIW", "ACLS", "ACLX", "ACM", "ACMR", "ACN", "ACNB", "ACNT", "ACOG", "ACON", "ACR", "ACRE", "ACRS", "ACRV", "ACT", "ACTG", "ACTU", "ACU", "ACVA", "ACXP", "ADAG", "ADAP", "ADBE", "ADC", "ADCT", "ADD", "ADEA", "ADGM", "ADI", "ADIL", "ADM", "ADMA", "ADN", "ADNT", "ADP", "ADPT", "ADSE", "ADSK", "ADT", "ADTN", "ADTX", "ADUR", "ADUS", "ADV", "ADVM", "ADXN", "AE", "AEE", "AEG", "AEHL", "AEHR", "AEI", "AEIS", "AEM", "AEMD", "AENT", "AEO", "AEON", "AEP", "AER", "AERT", "AES", "AESI", "AEVA", "AEYE", "AFBI", "AFCG", "AFG", "AFJK", "AFL", "AFMD", "AFRI", "AFRM", "AFYA", "AG", "AGAE", "AGCO", "AGEN", "AGFY", "AGI", "AGIO", "AGL", "AGM", "AGM.A", "AGMH", "AGNC", "AGO", "AGR", "AGRI", "AGRO", "AGS", "AGX", "AGYS", "AHCO", "AHG", "AHH", "AHR", "AHT", "AI", "AIEV", "AIFF", "AIFU", "AIG", "AIHS", "AILE", "AIM", "AIMAU", "AIMD", "AIN", "AIOT", "AIP", "AIR", "AIRE", "AIRG", "AIRI", "AIRJ", "AIRS", "AIRT", "AISP", "AIT", "AITR", "AIV", "AIXI", "AIZ", "AJG", "AJX", "AKA", "AKAM", "AKAN", "AKBA", "AKO.A", "AKO.B", "AKR", "AKRO", "AKTS", "AKTX", "AKYA", "AL", "ALAB", "ALAR", "ALB", "ALBT", "ALC", "ALCE", "ALCO", "ALCY", "ALDF", "ALDX", "ALE", "ALEC", "ALEX", "ALF", "ALG", "ALGM", "ALGN", "ALGS", "ALGT", "ALHC", "ALIT", "ALK", "ALKS", "ALKT", "ALL", "ALLE", "ALLK", "ALLO", "ALLR", "ALLT", "ALLY", "ALMS", "ALNT", "ALNY", "ALOT", "ALRM", "ALRN", "ALRS", "ALSA", "ALSN", "ALT", "ALTG", "ALTI", "ALTM", "ALTO", "ALTR", "ALTS", "ALUR", "ALV", "ALVO", "ALVR", "ALX", "ALXO", "ALZN", "AM", "AMAL", "AMAT", "AMBA", "AMBC", "AMBI", "AMBO", "AMBP", "AMC", "AMCR", "AMCX", "AMD", "AME", "AMED", "AMG", "AMGN", "AMH", "AMIX", "AMKR", "AMLI", "AMLX", "AMN", "AMP", "AMPG", "AMPH", "AMPL", "AMPS", "AMPX", "AMPY", "AMR", "AMRC", "AMRK", "AMRN", "AMRX", "AMS", "AMSC", "AMSF", "AMST", "AMT", "AMTB", "AMTD", "AMTM", "AMTX", "AMWD", "AMWL", "AMX", "AMZN", "AN", "ANAB", "ANDE", "ANEB", "ANET", "ANF", "ANGH", "ANGI", "ANGO", "ANIK", "ANIP", "ANIX", "ANL", "ANNX", "ANRO", "ANSC", "ANSS", "ANTE", "ANTX", "ANVS", "ANY", "AOMR", "AON", "AORT", "AOS", "AOSL", "AOUT", "AP", "APA", "APAM", "APCX", "APD", "APDN", "APEI", "APG", "APGE", "APH", "API", "APLD", "APLE", "APLM", "APLS", "APLT", "APM", "APO", "APOG", "APP", "APPF", "APPN", "APPS", "APRE", "APT", "APTO", "APTV", "APVO", "APWC", "APXI", "APYX", "AQB", "AQMS", "AQN", "AQST", "AQU", "AR", "ARAY", "ARBB", "ARBE", "ARBK", "ARC", "ARCB", "ARCC", "ARCH", "ARCO", "ARCT", "ARDT", "ARDX", "ARE", "AREB", "AREC", "AREN", "ARES", "ARGX", "ARHS", "ARI", "ARIS", "ARKO", "ARKR", "ARL", "ARLO", "ARLP", "ARM", "ARMK", "ARMN", "ARMP", "AROC", "AROW", "ARQ", "ARQQ", "ARQT", "ARR", "ARRY", "ARTL", "ARTNA", "ARTV", "ARTW", "ARVN", "ARW", "ARWR", "AS", "ASA", "ASAI", "ASAN", "ASB", "ASC", "ASGN", "ASH", "ASIX", "ASLE", "ASM", "ASMB", "ASML", "ASND", "ASNS", "ASO", "ASPC", "ASPI", "ASPN", "ASPS", "ASR", "ASRT", "ASRV", "ASST", "ASTC", "ASTE", "ASTH", "ASTI", "ASTL", "ASTS", "ASUR", "ASX", "ASYS", "ATAI", "ATAT", "ATCH", "ATEC", "ATEK", "ATEN", "ATER", "ATEX", "ATGE", "ATGL", "ATHA", "ATHE", "ATHM", "ATI", "ATIF", "ATIP", "ATKR", "ATLC", "ATLO", "ATLX", "ATMC", "ATMU", "ATMV", "ATNF", "ATNI", "ATNM", "ATO", "ATOM", "ATOS", "ATPC", "ATR", "ATRA", "ATRC", "ATRO", "ATS", "ATSG", "ATUS", "ATXG", "ATXI", "ATXS", "ATYR", "AU", "AUB", "AUBN", "AUDC", "AUID", "AUMN", "AUNA", "AUPH", "AUR", "AURA", "AUST", "AUTL", "AUUD", "AVA", "AVAH", "AVAL", "AVAV", "AVB", "AVBP", "AVD", "AVDL", "AVDX", "AVGO", "AVGR", "AVIR", "AVNS", "AVNT", "AVNW", "AVO", "AVPT", "AVT", "AVTE", "AVTR", "AVTX", "AVXL", "AVY", "AWH", "AWI", "AWK", "AWR", "AWRE", "AWX", "AX", "AXDX", "AXGN", "AXIL", "AXL", "AXON", "AXP", "AXR", "AXS", "AXSM", "AXTA", "AXTI", "AY", "AYI", "AYRO", "AYTU", "AZ", "AZEK", "AZI", "AZN", "AZO", "AZPN", "AZTA", "AZTR", "AZUL", "AZZ", "B", "BA", "BABA", "BAC", "BACK", "BACQ", "BAER", "BAFN", "BAH", "BAK", "BALL", "BALY", "BAM", "BANC", "BAND", "BANF", "BANL", "BANR", "BANX", "BAOS", "BAP", "BARK", "BASE", "BATL", "BATRA", "BATRK", "BAX", "BAYA", "BB", "BBAI", "BBAR", "BBCP", "BBD", "BBDC", "BBDO", "BBGI", "BBIO", "BBLG", "BBSI", "BBU", "BBUC", "BBVA", "BBW", "BBWI", "BBY", "BC", "BCAB", "BCAL", "BCAN", "BCAX", "BCBP", "BCC", "BCDA", "BCE", "BCG", "BCH", "BCLI", "BCML", "BCO", "BCOV", "BCOW", "BCPC", "BCRX", "BCS", "BCSF", "BCTX", "BCYC", "BDC", "BDL", "BDMD", "BDN", "BDRX", "BDSX", "BDTX", "BDX", "BE", "BEAG", "BEAM", "BEAT", "BECN", "BEDU", "BEEM", "BEEP", "BEKE", "BELFA", "BELFB", "BEN", "BENF", "BEP", "BEPC", "BERY", "BEST", "BETR", "BF.A", "BF.B", "BFAC", "BFAM", "BFC", "BFH", "BFIN", "BFLY", "BFRG", "BFRI", "BFS", "BFST", "BG", "BGC", "BGFV", "BGI", "BGLC", "BGM", "BGNE", "BGS", "BGSF", "BH", "BH.A", "BHAT", "BHB", "BHC", "BHE", "BHF", "BHIL", "BHLB", "BHM", "BHP", "BHR", "BHRB", "BHVN", "BIAF", "BIDU", "BIGC", "BIIB", "BILI", "BILL", "BIO", "BIO.B", "BIOA", "BIOR", "BIOX", "BIP", "BIPC", "BIRD", "BIRK", "BITF", "BIVI", "BJ", "BJDX", "BJRI", "BK", "BKD", "BKE", "BKH", "BKHA", "BKKT", "BKNG", "BKR", "BKSY", "BKTI", "BKU", "BKV", "BKYI", "BL", "BLAC", "BLBD", "BLBX", "BLCO", "BLD", "BLDE", "BLDP", "BLDR", "BLEU", "BLFS", "BLFY", "BLIN", "BLK", "BLKB", "BLMN", "BLMZ", "BLND", "BLNK", "BLRX", "BLTE", "BLUE", "BLX", "BLZE", "BMA", "BMBL", "BMEA", "BMI", "BMO", "BMR", "BMRA", "BMRC", "BMRN", "BMTX", "BMY", "BN", "BNAI", "BNED", "BNGO", "BNIX", "BNL", "BNOX", "BNR", "BNRG", "BNS", "BNT", "BNTC", "BNTX", "BNZI", "BOC", "BOCN", "BODI", "BOF", "BOH", "BOKF", "BOLD", "BOLT", "BON", "BOOM", "BOOT", "BORR", "BOSC", "BOTJ", "BOW", "BOWL", "BOWN", "BOX", "BOXL", "BP", "BPMC", "BPOP", "BPRN", "BPT", "BPTH", "BQ", "BR", "BRAC", "BRAG", "BRBR", "BRBS", "BRC", "BRCC", "BRDG", "BREA", "BRFH", "BRFS", "BRID", "BRK.A", "BRK.B", "BRKH", "BRKL", "BRKR", "BRLS", "BRLT", "BRN", "BRNS", "BRO", "BROG", "BROS", "BRSP", "BRT", "BRTX", "BRX", "BRY", "BRZE", "BSAC", "BSBK", "BSBR", "BSET", "BSFC", "BSGM", "BSIG", "BSII", "BSLK", "BSM", "BSRR", "BSVN", "BSX", "BSY", "BTAI", "BTBD", "BTBT", "BTCM", "BTCS", "BTCT", "BTDR", "BTE", "BTG", "BTI", "BTM", "BTMD", "BTOC", "BTOG", "BTSG", "BTTR", "BTU", "BUD", "BUJA", "BUR", "BURL", "BURU", "BUSE", "BV", "BVFL", "BVN", "BVS", "BW", "BWA", "BWAY", "BWB", "BWEN", "BWFG", "BWIN", "BWLP", "BWMN", "BWMX", "BWXT", "BX", "BXC", "BXMT", "BXP", "BY", "BYD", "BYFC", "BYND", "BYNO", "BYON", "BYRN", "BYSI", "BYU", "BZ", "BZFD", "BZH", "BZUN", "C", "CAAP", "CAAS", "CABA", "CABO", "CAC", "CACC", "CACI", "CADE", "CADL", "CAE", "CAG", "CAH", "CAKE", "CAL", "CALC", "CALM", "CALX", "CAMP", "CAMT", "CAN", "CANF", "CANG", "CAPL", "CAPN", "CAPR", "CAPT", "CAR", "CARA", "CARE", "CARG", "CARM", "CARR", "CARS", "CART", "CARV", "CASH", "CASI", "CASS", "CASY", "CAT", "CATO", "CATX", "CATY", "CAVA", "CB", "CBAN", "CBAT", "CBFV", "CBL", "CBLL", "CBNA", "CBNK", "CBOE", "CBRE", "CBRL", "CBSH", "CBT", "CBU", "CBUS", "CBZ", "CC", "CCAP", "CCB", "CCBG", "CCCC", "CCCS", "CCEC", "CCEL", "CCEP", "CCG", "CCI", "CCIR", "CCIX", "CCJ", "CCK", "CCL", "CCLD", "CCM", "CCNE", "CCO", "CCOI", "CCRD", "CCRN", "CCS", "CCSI", "CCTG", "CCU", "CDE", "CDIO", "CDLR", "CDLX", "CDMO", "CDNA", "CDNS", "CDP", "CDRE", "CDRO", "CDT", "CDTG", "CDTX", "CDW", "CDXC", "CDXS", "CDZI", "CE", "CEAD", "CECO", "CEG", "CEIX", "CELC", "CELH", "CELU", "CELZ", "CENN", "CENT", "CENTA", "CENX", "CEP", "CEPU", "CERO", "CERS", "CERT", "CET", "CETX"]
const sizes = {
  width: 500,
  height: 500,
};

const speedDown = 300

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.playerSpeed;
    this.cursor;
    this.playerSpeed = speedDown+50;
    this.target;
  }

  preload() {
    this.load.image("bg", "assets/bg.png")
    this.load.image("apple", "assets/apple.png")
    this.load.image('cow', 'assets/animals/cow.png');
    this.load.image('donkey', 'assets/animals/donkey.png');
    this.load.image('chicken', 'assets/animals/chicken.png');
    this.load.image('rooster', 'assets/animals/rooster.png');
    this.load.image('chick', 'assets/animals/chick.png');
    this.load.image('horse', 'assets/animals/horse.png');
    this.load.image('pig', 'assets/animals/pig.png');
    
    
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    // Create the player
    this.player = this.physics.add
        .image(0, sizes.height * 0.8, "apple")
        .setOrigin(0, 0);
    this.player.setImmovable(true);
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);

    // Create the label
    this.label = this.add.text(
        this.player.x + this.player.displayWidth / 2,
        this.player.y + this.player.displayHeight,
        "debugging apple",
        { font: "16px Arial", fill: "#8B0000" }
    ).setOrigin(0.5, 0.5);

    this.animals = [];

    // Add 10 random animals and their labels
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * tickerSyms.length);
      const randomTicker = tickerSyms[randomIndex]; // Random ticker symbol
  
      // Create the animal object and add it to the animals array
      const animal = new animalCreator.Animal(this, randomTicker);
      this.animals.push(animal);
  }

    // Capture input
    this.cursor = this.input.keyboard.createCursorKeys();
    this.events.on('prerender', this.preRender, this);
}

update() {
    // Handle player movement
    const { left, right } = this.cursor;
    if (left.isDown) {
        this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
        this.player.setVelocityX(this.playerSpeed);
    } else {
        this.player.setVelocityX(0);
    }
}

preRender ()
{
    this.label.setPosition(
      this.player.x + this.player.displayWidth / 2,
      this.player.y + this.player.displayHeight,
    );
}
  


}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug: false,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);

