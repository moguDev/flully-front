import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "プライバシーポリシー | flully - ふらりと出会った動物をシェアできるコミュニティ",
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="mb-6 select-none">
      <div className="relative p-2">
        <div className="absolute top-0 left-0 h-full w-full bg-main bg-opacity-10" />
        <div className="absolute top-0 left-0 bg-main bg-opacity-60 w-1 h-full " />
        <h2 className="font-bold text-lg ml-2">{title}</h2>
      </div>
      <div
        className="p-2 text-gray-700 lg:text-sm text-xs"
        style={{ lineHeight: "26px" }}
      >
        {children}
      </div>
    </section>
  );
};

export default function PrivacyPage() {
  return (
    <main className="overflow-hidden">
      <div className="py-20 max-w-4xl mx-auto">
        <div className="py-5 px-10 bg-white rounded-lg">
          <h1 className="font-black text-3xl mb-4 py-2 border-b border-black">
            プライバシーポリシー
          </h1>
          <section className="mb-4 p-2 text-sm" style={{ lineHeight: "26px" }}>
            <p>
              flully.jp（以下，「当社」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
            </p>
          </section>
          <Section title="お客様から取得する情報">
            <p>当社は、お客様から以下の情報を取得します。</p>
            <ul className="list-disc list-inside p-2">
              <li className="p-1">
                氏名(ニックネームやペンネームも含む) 年齢または生年月日
              </li>
              <li className="p-1">メールアドレス 住所 写真や動画</li>
              <li className="p-1">
                外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
              </li>
              <li className="p-1">
                Cookie(クッキー)を用いて生成された識別情報
              </li>
              <li className="p-1">
                OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報
              </li>
              <li className="p-1">
                当社ウェブサイトの滞在時間、入力履歴、購買履歴等の当社ウェブサイトにおけるお客様の行動履歴
              </li>
              <li className="p-1">
                当社アプリの起動時間、入力履歴、購買履歴等の当社アプリの利用履歴
              </li>
              <li className="p-1">お客様の位置情報</li>
            </ul>
          </Section>
          <Section title="お客様の情報を利用する目的">
            <p>
              当社は、お客様から取得した情報を、以下の目的のために利用します。
            </p>
            <ul className="list-disc list-inside p-2">
              <li className="p-1">
                当社サービスに関する登録の受付、お客様の本人確認、認証のため
              </li>
              <li className="p-1">
                お客様の当社サービスの利用履歴を管理するため
              </li>
              <li className="p-1">
                当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため
              </li>
              <li className="p-1">当社のサービスに関するご案内をするため</li>
              <li className="p-1">お客様からのお問い合わせに対応するため</li>
              <li className="p-1">
                当社の規約や法令に違反する行為に対応するため
              </li>
              <li className="p-1">
                当社サービスの変更、提供中止、終了、契約解除をご連絡するため
              </li>
              <li className="p-1">当社規約の変更等を通知するため</li>
              <li className="p-1">
                以上の他、当社サービスの提供、維持、保護及び改善のため
              </li>
            </ul>
          </Section>
          <Section title="安全管理のために講じた措置">
            <p>
              当社が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
            </p>
          </Section>
          <Section title="第三者提供">
            <p>
              当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
            </p>
            <p>但し、次の場合は除きます。</p>
            <ul className="list-disc list-inside p-2">
              <li className="p-1">個人データの取扱いを外部に委託する場合</li>
              <li className="p-1">当社や当社サービスが買収された場合</li>
              <li className="p-1">
                事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
              </li>
              <li className="p-1">
                その他、法律によって合法的に第三者提供が許されている場合
              </li>
            </ul>
          </Section>
          <Section title="アクセス解析ツール">
            <p>
              当社は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
            </p>
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              className="text-blue-500 underline"
            >
              <p className="py-2">Googleアナリティクス利用規約（外部サイト）</p>
            </a>
          </Section>
          <Section title="プライバシーポリシーの変更">
            <p>
              当社は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
            </p>
          </Section>
          <Section title="お問い合わせ">
            <p>
              お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
            </p>
            <div className="flex items-center p-2">
              <p className="material-icons mr-1" style={{ fontSize: "14px" }}>
                mail
              </p>
              <a className="text-blue-500 underline">contact@flully.jp</a>
            </div>
          </Section>
          <Section title="附則">
            <ul className="list-disc list-inside p-2">
              <li className="p-1">2024年11月19日 制定</li>
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}
