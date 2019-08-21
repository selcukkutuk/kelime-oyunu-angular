import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  sorular: Soru[] = [
    {
      soru: "Siyah ile aynı anlama gelen bir renk.",
      cevap: "KARA",
      soruldu: false
    },
    {
      soru: "Sık kullanılan bir isim.",
      cevap: "AHMET",
      soruldu: false
    },
    {
      soru: "Türkiye'nin başkenti",
      cevap: "ANKARA",
      soruldu: false
    },
    {
      soru: "Karadenizde bir ilimiz",
      cevap: "TRABZON",
      soruldu: false
    }
  ];
  mesaj: string = null;
  mesajClass: string = "";
  mesajSure: any = null;
  mevcutSoru: Soru = null;
  harfler: any[] = [];
  puan: number = 0;
  harfPuan: number = 0;
  yarismaciCevap: string = "";
  tamamlandi: boolean = false;
  sure: any = null;
  kalanSure: number = 0;

  mesajGoster(mesaj: string, tur: MesajTurleri = null): void {
    if (this.mesajSure) {
      clearTimeout(this.mesajSure);
      this.mesajSure = null;
    }
    this.mesaj = mesaj;
    if (tur === MesajTurleri.hata) {
      this.mesajClass = "bg-danger text-white";
    } else if (tur === MesajTurleri.basari) {
      this.mesajClass = "bg-success text-white";
    } else {
      this.mesajClass = "bg-dark text-white";
    }
    this.mesajSure = setTimeout(() => {
      this.mesaj = null;
    }, 3000);
  }
  basla(): void {
    this.tamamlandi = false;
    this.mevcutSoru = null;
    this.puan = 0;
    this.sorular.map(x => {
      x.soruldu = false;
    });
    this.kalanSure = 240;
    this.sure = setInterval(() => {
      this.kalanSure--;
      if (this.kalanSure === 0) {
        this.bitir();
      }
    }, 1000);
    this.soruVer();
    this.mesajGoster("İyi yarışmalar!");
  }
  bitir(): void {
    clearInterval(this.sure);
    this.mevcutSoru = null;
    this.tamamlandi = true;
  }
  soruVer(): void {
    this.yarismaciCevap = "";
    this.mevcutSoru = this.sorular.find(x => !x.soruldu);
    if (!this.mevcutSoru) {
      this.bitir();
      return;
    }
    this.harfler = [];
    this.mevcutSoru.cevap.split("").map(x => {
      this.harfler.push({
        harf: x,
        acildi: false
      });
    });
    this.harfPuan = this.harfler.length * 100;
    this.mevcutSoru.soruldu = true;
  }
  harfVer(): void {
    let rastgeleHarfIndex = Math.floor(Math.random() * this.harfler.length);

    if (this.harfPuan <= 100) {
      return;
    }

    let harf = this.harfler[rastgeleHarfIndex];
    while (harf.acildi) {
      rastgeleHarfIndex = Math.floor(Math.random() * this.harfler.length);
      harf = this.harfler[rastgeleHarfIndex];
    }
    harf.acildi = true;
    this.harfPuan -= 100;
  }
  cevapVer(): void {
    if (!this.yarismaciCevap.length) {
      return;
    }

    if (this.yarismaciCevap.length !== this.harfler.length) {
      this.mesajGoster("Harf sayıları tutmuyor!");
      return;
    }

    let cevap = (this.yarismaciCevap as any).toLocaleUpperCase(
      "tr-TR"
    ) as string;
    this.yarismaciCevap = cevap;

    if (
      this.yarismaciCevap ===
      ((this.mevcutSoru.cevap as any).toLocaleUpperCase("tr-TR") as string)
    ) {
      this.puan += this.harfPuan;
      this.mesajGoster("Tebrikler, doğru bildiniz!", MesajTurleri.basari);
    } else {
      this.puan -= this.harfPuan;
      this.mesajGoster(
        `Yanlış cevap, doğrusu '${this.mevcutSoru.cevap}' olmalıydı!`,
        MesajTurleri.hata
      );
    }

    this.soruVer();
  }
  enterIleCevapVer(event: KeyboardEvent): void {
    if (event.key === Tuslar.Enter) this.cevapVer();
  }
}
enum MesajTurleri {
  hata,
  basari
}
enum Tuslar {
  Enter = "Enter"
}
interface Soru {
  soru: string;
  cevap: string;
  soruldu: boolean;
}
