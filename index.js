const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/
function fourteen(someData) {
  let filteredArray = someData.filter(
    (element) => element["Year"] === 2014 && element["Stage"] === "Final"
  );
  let a = filteredArray.map((item) => item["Home Team Name"]);
  let b = filteredArray.map((item) => item["Away Team Name"]);
  let c = filteredArray.map((item) => item["Home Team Goals"]);
  let d = filteredArray.map((item) => item["Away Team Goals"]);
  let e = c > d ? `Winner is ${a}` : `Winner is ${b}`;
  // console.log(a, b, c, d, e);
}
fourteen(fifaData);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(someData) {
  const filteredArray = someData.filter((match) => match.Stage === "Final");
  return filteredArray;
}

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(someData, callBack) {
  return callBack(someData).map((final) => final.Year);
}
// console.log(Yillar(fifaData, Finaller));
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(someData, callBack) {
  let kazananlar = [];
  for (let i = 0; i < callBack(someData).length; i++) {
    if (
      callBack(someData)[i]["Home Team Goals"] >
      callBack(someData)[i]["Away Team Goals"]
    ) {
      kazananlar.push(callBack(someData)[i]["Home Team Name"]);
    } else if (
      callBack(someData)[i]["Away Team Goals"] >
      callBack(someData)[i]["Home Team Goals"]
    ) {
      kazananlar.push(callBack(someData)[i]["Away Team Name"]);
    }
  }
  return kazananlar;
}

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(
  someData,
  finalsCallBack,
  yearsCallBack,
  winnerCallBack
) {
  let sentenceArray = [];
  for (let i = 0; i < finalsCallBack(someData).length; i++) {
    sentenceArray.push(
      `${yearsCallBack(someData, finalsCallBack)[i]} yılında, ${
        winnerCallBack(someData, finalsCallBack)[i]
      } dünya kupasını kazandı!`
    );
  }
  return sentenceArray;
}

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finalsCallBack) {
  let totalGoalsArray = [];
  finalsCallBack.forEach((element) => {
    totalGoalsArray.push(
      +element["Home Team Goals"] + element["Away Team Goals"]
    );
  });
  let totalGoals = totalGoalsArray.reduce((a, b) => a + b, 0);

  return (totalGoals / finalsCallBack.length).toFixed(2);
}
// console.log(OrtalamaGolSayisi(Finaller(fifaData)));
/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data, initial) {
  const onlyFinals = data.filter((match) => match.Stage === "Final");
  let initials = onlyFinals.map((item) => {
    if (item["Home Team Goals"] > item["Away Team Goals"]) {
      return item["Home Team Initials"];
    } else if (item["Home Team Goals"] < item["Away Team Goals"]) {
      return item["Away Team Initials"];
    } else {
      if (item["Win conditions"].split(" win")[0] === item["Home Team Name"]) {
        return item["Home Team Initials"];
      } else {
        return item["Away Team Initials"];
      }
    }
  });
  let reducedObject = initials.reduce(
    (count, item) => (item == initial ? count + 1 : count),
    0
  );

  return reducedObject;
}

// console.log(UlkelerinKazanmaSayilari(fifaData, "FRA"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
  const onlyFinals = data.filter((match) => match.Stage === "Final");
  let goalsEachMatch = onlyFinals.flatMap((element) => {
    return [
      {
        team: element["Home Team Initials"],
        goal: element["Home Team Goals"],
      },
      {
        team: element["Away Team Initials"],
        goal: element["Away Team Goals"],
      },
    ];
  });
  let allTeamsScores = goalsEachMatch.reduce((acc, item) => {
    acc[item.team] = acc[item.team] //eğer key olarak item.team varsa acc içerisinde
      ? Number(acc[item.team]) + item.goal //varsa value'suna item.goal ekle
      : item.goal; //yoksa item.team key, item.goal value olacak şekilde pair oluştur.
    return acc; //Hangi takımın kaç golü olduğunu gösteren obje döner.
  }, {});

  // Son olarak maximum golü atan takım için tekrar reduce

  let finalResult = Object.keys(allTeamsScores).reduce((a, b) =>
    allTeamsScores[a] > allTeamsScores[b] ? a : b
  );
  return finalResult;
}

console.log(EnCokGolAtan(fifaData));
/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
  //Final Maçlarını Filtreledik.
  const onlyFinals = data.filter((match) => match.Stage === "Final");
  //flatmap ile her final maçı için aşağıdaki şekilde 2 obje ürettik.
  let goalsEachMatch = onlyFinals.flatMap((element) => {
    return [
      {
        team: element["Home Team Initials"],
        goal: element["Away Team Goals"],
      },
      {
        team: element["Away Team Initials"],
        goal: element["Home Team Goals"],
      },
    ];
  });

  //İlk reduce'da unique initial ve toplam gol elde ettik

  let allTeamsScores = goalsEachMatch.reduce((acc, item) => {
    acc[item.team] = acc[item.team] //eğer key olarak item.team varsa acc içerisinde
      ? Number(acc[item.team]) + item.goal //varsa value'suna item.goal ekle
      : item.goal; //yoksa item.team key, item.goal value olacak şekilde pair oluştur.
    return acc; //Hangi takımın kaç golü olduğunu gösteren obje döner.
  }, {});

  // Son olarak maximum golü atan takım için tekrar reduce

  let finalResult = Object.keys(allTeamsScores).reduce((a, b) =>
    allTeamsScores[a] > allTeamsScores[b] ? a : b
  );
  return finalResult;
}
console.log(EnKotuDefans(fifaData));
/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
