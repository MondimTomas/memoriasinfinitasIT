import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";
import "./styles.css";

const SECTIONS = [
  { key: "gastronomia", label: "Gastronomia" },
  { key: "experiencias", label: "Experiências" },
];

function restaurantRating(id, title, ratingTomas, ratingInes) {
  return {
    id,
    section: "gastronomia",
    title,
    date: "",
    place: title,
    description: "Restaurante por detalhar.",
    photos: [],
    ratingTomas,
    ratingInes,
  };
}

// ✅ Fotos: coloca em /public/photos/*.jpg  -> usa "/photos/nome.jpg"
// ✅ Vídeos: coloca em /public/videos/*.mp4 -> usa "/videos/nome.mp4"
const ENTRIES = [
  // -----------------
  // GASTRONOMIA
  // -----------------
  // Restaurantes últimos
  {
  id: "g-due-fratelli-2026-07-07",
  section: "gastronomia",
  title: "Due Fratelli",
  date: "2026-07-07",
  place: "Due Fratelli",
  description: "Segundo melhor restaurante italiano em Setúbal.",
  photos: [
    "/photos/due-fratelli1.jpg",
    "/photos/due-fratelli2.jpg",
    "/photos/due-fratelli3.jpg",
  ],
  ratingTomas: 9.5,
  ratingInes: 9,
},
 {
  id: "g-lanos-2026-01-21",
  section: "gastronomia",
  title: "Lanos",
  date: "2026-01-21",
  place: "Lanos",
  description:
    "Restaurante bom qualidade/preço em Setúbal.",
  photos: [
    "/photos/lanos1.jpg",
    "/photos/lanos2.jpg",
  ],
  ratingTomas: 8.5,
  ratingInes: 8.5,
},
{
  id: "g-italia-no-prato-2026-01-17",
  section: "gastronomia",
  title: "Itália no Prato",
  date: "2026-01-17",
  place: "Itália no Prato",
  description:
    "Massas boas e sítio giro. Terceira melhor massa de Setúbal.",
  photos: [
    "/photos/italia-no-prato1.jpg",
    "/photos/italia-no-prato2.jpg",
  ],
  ratingTomas: 8.5,
  ratingInes: 8,
},
 {
  id: "g-kodashi-2026-01-13",
  section: "gastronomia",
  title: "Kodashi",
  date: "2026-01-13",
  place: "Kodashi",
  description: "Melhor sushi de Setúbal.",
  photos: [
    "/photos/kodashi1.jpg",
    "/photos/kodashi2.jpg",
  ],
  ratingTomas: 9.5,
  ratingInes: 9.5,
},
 {
  id: "g-ze-da-montanha-2026-01-02",
  section: "gastronomia",
  title: "Zé da Montanha",
  date: "2026-01-02",
  place: "Zé da Montanha",
  description:
    "O único sítio que nos serviu na Serra da Estrela às 17 horas.",
  photos: [
    "/photos/ze-da-montanha1.jpg",
    "/photos/ze-da-montanha2.jpg",
  ],
  ratingTomas: 8.5,
  ratingInes: 6,
},
  {
  id: "g-restaurante-miralva-2026-01-01",
  section: "gastronomia",
  title: "Restaurante Miralva",
  date: "2026-01-01",
  place: "Restaurante Miralva",
  description:
    "Carne que nos faz voltar à infância.",
  photos: [
    "/photos/restaurante-miralva1.jpg",
    "/photos/restaurante-miralva2.jpg",
  ],
  ratingTomas: 9,
  ratingInes: 8.5,
},
 {
  id: "g-grano-pasta-fresca-2025-12-30",
  section: "gastronomia",
  title: "Grano Pasta Fresca",
  date: "2025-12-30",
  place: "Grano Pasta Fresca",
  description:
    "Restaurante italiano sólido, mas nada de mais. Setúbal a dominar. Cannoli desiludiu.",
  photos: [
    "/photos/grano-pasta-fresca1.jpg",
    "/photos/grano-pasta-fresca2.jpg",
    "/photos/grano-pasta-fresca3.jpg",
    "/photos/grano-pasta-fresca4.jpg",
  ],
  ratingTomas: 8,
  ratingInes: 8,
},
{
  id: "g-blade-2025-12-22",
  section: "gastronomia",
  title: "Blade",
  date: "2025-12-22",
  place: "Blade",
  description:
    "Só havia um prato, mas bastante bom. Gelado de graça, pipocas de entrada — restaurante de TikTok.",
  photos: [
    "/photos/blade1.jpg",
  ],
  ratingTomas: 9.5,
  ratingInes: 9.5,
},
  {
  id: "g-chef-stories-about-meat-2025-12-18",
  section: "gastronomia",
  title: "Chef Stories About Meat",
  date: "2025-12-18",
  place: "Chef Stories About Meat",
  description:
    "A carne custava a mastigar. Restaurante a não voltar :( Muito caro ainda por cima.",
  photos: [
    "/photos/chef-stories-about-meat1.jpg",
    "/photos/chef-stories-about-meat2.jpg",
    "/photos/chef-stories-about-meat3.jpg",
  ],
  ratingTomas: 5.5,
  ratingInes: 5.5,
},
  {
  id: "g-mister-tapas-2025-11-30",
  section: "gastronomia",
  title: "Mister Tapas",
  date: "2025-11-30",
  place: "Mister Tapas",
  description:
    "Barraquinha em Belém com vista para o rio, mas podiam ter caprichado mais nos ingredientes.",
  photos: [
    "/photos/mister-tapas1.jpg",
    "/photos/mister-tapas2.jpg",
  ],
  ratingTomas: 7.5,
  ratingInes: 7,
},
{
  id: "g-pico-de-galo-2025-11-22",
  section: "gastronomia",
  title: "Pico de Galo",
  date: "2025-11-22",
  place: "Pico de Galo",
  description: "Mais picância que sabor.",
  photos: [
    "/photos/pico-de-galo1.jpg",
  ],
  ratingTomas: 6.5,
  ratingInes: 6.5,
},
  {
  id: "g-han-table-2025-11-19",
  section: "gastronomia",
  title: "Han Table",
  date: "2025-11-19",
  place: "Han Table",
  description:
    "A Inês já tinha experimentado e foi uma boa escolha para uma noite fria.",
  photos: [
    "/photos/han-table1.jpg",
    "/photos/han-table2.jpg",
  ],
  ratingTomas: 8.5,
  ratingInes: 9,
},
{
  id: "g-alkawa-2025-11-07",
  section: "gastronomia",
  title: "Alkawa",
  date: "2025-11-07",
  place: "Alkawa",
  description:
    "Os empregados odeiam-nos, apesar do sushi ser bom. Kodashi melhor.",
  photos: [
    "/photos/alkawa1.jpeg",
  ],
  ratingTomas: 7.5,
  ratingInes: 8.5,
},
 {
  id: "g-adega-dos-passarinhos-2025-11-07",
  section: "gastronomia",
  title: "Adega dos Passarinhos",
  date: "2025-11-07",
  place: "Adega dos Passarinhos",
  description:
    "Um clássico de Setúbal que a Inês não conhecia. Peixe muito bom.",
  photos: [
    "/photos/adega-dos-passarinhos1.jpeg",
  ],
  ratingTomas: 8.5,
  ratingInes: 8.5,
},
 {
  id: "g-pateo-real-2025-11-01",
  section: "gastronomia",
  title: "Páteo Real",
  date: "2025-11-01",
  place: "Páteo Real",
  description:
    "Não podia haver melhor restaurante para o primeiro dia de amor.",
  photos: [
    "/photos/pateo-real1.jpeg",
    "/photos/pateo-real2.jpeg",
  ],
  videos: [
    "/videos/pateo-real1.mp4",
  ],
  ratingTomas: 10,
  ratingInes: 10,
},
{
  id: "g-lisbon-comedy-club-2026-01-24",
  section: "gastronomia",
  title: "Lisbon Comedy Club",
  date: "2026-01-24",
  place: "Lisbon Comedy Club",
  description:
    "Bom humor, comida e atendimento desastrosos.",
  photos: [
    "/photos/lisbon-comedy-club1.jpg",
  ],
  ratingTomas: 4,
  ratingInes: 4.5,
},
  {
  id: "g-soya-noodle-bar-2026-01-27",
  section: "gastronomia",
  title: "Soya Noodle Bar",
  date: "2026-01-27",
  place: "Soya Noodle Bar",
  description: "O melhor tailandês em Setúbal.",
  photos: [
    "/photos/soya-noodle-bar1.jpg",
    "/photos/soya-noodle-bar2.jpg",
  ],
  ratingTomas: 9,
  ratingInes: 8,
},
 {
  id: "g-oltre-2026-02-13",
  section: "gastronomia",
  title: "Oltre",
  date: "2026-02-13",
  place: "Oltre",
  description:
    "Hambúrgueres no estúdio, muito bem executados. O pão não era o melhor.",
  photos: [
    "/photos/oltre1.jpg",
    "/photos/oltre2.jpg",
  ],
  ratingTomas: 8.5,
  ratingInes: 8,
},
  {
  id: "g-azcook-2026-02-14",
  section: "gastronomia",
  title: "AZCook",
  date: "2026-02-14",
  place: "AZCook",
  description:
    "Dia dos Namorados muito criativo. Vi a Inês a tentar cozinhar pela primeira e última vez na minha vida.",
  photos: [
    "/photos/azcook1.jpg",
    "/photos/azcook2.jpg",
  ],
  ratingTomas: 10,
  ratingInes: 10,
},
 {
  id: "g-brasao-2026-02-05",
  section: "gastronomia",
  title: "Brasão",
  date: "2026-02-05",
  place: "Brasão",
  description:
    "Francesinha preferida da Inês. O Tomás não amou o pão.",
  photos: [
    "/photos/brasao1.jpg",
    "/photos/brasao2.jpg",
  ],
  ratingTomas: 8.5,
  ratingInes: 9.5,
},
  {
  id: "g-tasca-da-fatinha-2026-01-30",
  section: "gastronomia",
  title: "Tasca da Fatinha",
  date: "2026-01-30",
  place: "Tasca da Fatinha",
  description:
    "Sopa de peixe muito boa. Fomos muito saudáveis neste clássico setubalense.",
  photos: [
    "/photos/tasca-fatinha1.jpg",
    "/photos/tasca-fatinha2.jpg",
  ],
  ratingTomas: 8,
  ratingInes: 8.5,
},
 {
  id: "g-dragon-palace-2026-03-06",
  section: "gastronomia",
  title: "Dragon Palace",
  date: "2026-03-06",
  place: "Dragon Palace",
  description:
    "Recomendação da Margarida, mas sushi mediano. Sítio bonito. Obrigado, Margarida.",
  photos: [
    "/photos/dragon-palace1.jpg",
    "/photos/dragon-palace2.jpg",
    "/photos/dragon-palace3.jpg",
  ],
  ratingTomas: 7,
  ratingInes: 7,
},
{
  id: "g-cafe-santiago-2026-03-07",
  section: "gastronomia",
  title: "Café Santiago",
  date: "2026-03-07",
  place: "Café Santiago",
  description:
    "Empregado engraçado e francesinhas boas, mas nada de outro mundo.",
  photos: [
    "/photos/cafe-santiago1.jpg",
    "/photos/cafe-santiago2.jpg",
  ],
  ratingTomas: 8,
  ratingInes: 8,
},
 {
  id: "g-aguacate-foz-2026-03-07",
  section: "gastronomia",
  title: "Aguacate Foz",
  date: "2026-03-07",
  place: "Aguacate Foz",
  description:
    "Carne desastrosa e arroz horroroso.",
  photos: [
    "/photos/aguacate1.jpg",
    "/photos/aguacate2.jpg",
  ],
  ratingTomas: 5.5,
  ratingInes: 5,
},
{
  id: "g-chef-rui-paula-2026-03-08",
  section: "gastronomia",
  title: "Chef Rui Paula",
  date: "2026-03-08",
  place: "Time Out",
  description:
    "Comida portuense de alta qualidade, no Time Out.",
  photos: [
  "/photos/chef-rui-paula3.jpeg",
  "/photos/chef-rui-paula4.jpeg",
],
  ratingTomas: 9.5,
  ratingInes: 9,
},
{
  id: "g-chef-vasco-coelho-santos-sobremesa-2026-03-08",
  section: "gastronomia",
  title: "Chef Vasco Coelho Santos — Sobremesa",
  date: "2026-03-08",
  place: "Chef Vasco Coelho Santos",
  description: "Sobremesa galática.",
  photos: [
    "/photos/chef-vasco-sobremesa1.jpg",
  ],
  ratingTomas: 9,
  ratingInes: 10,
},
  {
  id: "g-nova-casa-dos-leitoes-2026-03-08",
  section: "gastronomia",
  title: "Nova Casa dos Leitões",
  date: "2026-03-08",
  place: "Nova Casa dos Leitões",
  description:
    "Na volta do Porto, muito reconfortante.",
  photos: [
    "/photos/nova-casa-leitoes1.jpg",
    "/photos/nova-casa-leitoes2.jpg",
  ],
  ratingTomas: 9.5,
  ratingInes: 9,
},
  {
  id: "g-ikea-2026-03-14",
  section: "gastronomia",
  title: "Ikea",
  date: "2026-03-14",
  place: "Ikea",
  description:
    "Almôndegas clássicas e cinnamon rolls mid. Tarte de Daim que o Tomás não gostou.",
  photos: [
    "/photos/ikea1.jpg",
    "/photos/ikea2.jpg",
    "/photos/ikea3.jpg",
  ],
  ratingTomas: 9,
  ratingInes: 9,
},
 {
  id: "g-hamburguer-cup-2026-03-28",
  section: "gastronomia",
  title: "Hambúrguer Cup",
  date: "2026-03-28",
  place: "Hambúrguer Cup",
  description: "Double date muito divertido.",
  photos: [
    "/photos/hamburguer-cup1.jpg",
    "/photos/hamburguer-cup2.jpg",
  ],
  ratingTomas: 7.5,
  ratingInes: 7.5,
},
{
  id: "g-steak-and-frites-2026-05-12",
  section: "gastronomia",
  title: "Steak and Frites",
  date: "2026-05-12",
  place: "Steak and Frites",
  description:
    "Jogo do Ronaldo a ser campeão, mas sítio horrível e sem cozinheiro.",
  photos: [
    "/photos/steak-frites-1.jpg",
    "/photos/steak-frites-2.jpg",
    "/photos/steak-frites-3.jpg",
  ],
  ratingTomas: 5,
  ratingInes: 4,
},
{
  id: "g-nunca-2026-06-01",
  section: "gastronomia",
  title: "NUNCA",
  date: "2026-06-01",
  place: "NUNCA",
  description: "Jantar de anos da Inês.",
  photos: [
    "/photos/nunca1.jpg",
    "/photos/nunca2.jpg",
    "/photos/nunca3.jpg",
    "/photos/nunca4.jpg",
  ],
  ratingTomas: 7,
  ratingInes: 7.5,
},
{
  id: "g-selo-de-mar-2026-06-01",
  section: "gastronomia",
  title: "Selo de Mar",
  date: "2026-06-01",
  place: "Selo de Mar",
  description: "Almoço de 26 anos da 🧈.",
  photos: [
    "/photos/selo-de-mar1.jpg",
    "/photos/selo-de-mar2.jpg",
    "/photos/selo-de-mar3.jpg",
    "/photos/selo-de-mar4.jpg",
  ],
  ratingTomas: 8.5,
  ratingInes: 8.5,
},
{
  id: "g-calma-2025-09-23",
  section: "gastronomia",
  title: "Calma calma",
  date: "2025-09-23",
  place: "Calma",
  description:
    "Fomos no primeiro date e ficámos até fechar. Entretanto já fomos mais vezes e foi sempre incrível.",
  photos: [
    "/photos/calma1.jpg",
    "/photos/calma2.jpg",
    "/photos/calma3.jpg",
    "/photos/calma4.jpg",
  ],
  ratingTomas: 10,
  ratingInes: 10,
},
{
  id: "g-mare-jose-avillez-2026-06-04",
  section: "gastronomia",
  title: "Maré by José Avillez",
  date: "2026-06-04",
  place: "Maré by José Avillez",
  description:
    "Cataplana louca mid, mas bacalhau à Brás insanamente bom e crème brûlée muito bom. A partir daqui acabaram as sobremesas loucas.",
  photos: [
    "/photos/mare-jose-avillez1.jpg",
    "/photos/mare-jose-avillez2.jpg",
    "/photos/mare-jose-avillez3.jpg",
  ],
  ratingTomas: 8,
  ratingInes: 8,
},
{
  id: "g-quintal-2026-05-25",
  section: "gastronomia",
  title: "Quintal",
  date: "2026-05-25",
  place: "Quintal",
  description: "Sushi diferente, mas não grande coisa.",
  photos: [
    "/photos/quintal1.jpg",
    "/photos/quintal2.jpg",
  ],
  ratingTomas: 6.5,
  ratingInes: 7,
},
{
  id: "g-solar-dos-presuntos-2026-05-18",
  section: "gastronomia",
  title: "Solar dos Presuntos",
  date: "2026-05-18",
  place: "Solar dos Presuntos",
  description: "Um clássico de Lisboa que não deixou a desejar.",
  photos: [
    "/photos/solar-dos-presuntos1.jpg",
    "/photos/solar-dos-presuntos2.jpg",
    "/photos/solar-dos-presuntos3.jpg",
    "/photos/solar-dos-presuntos4.jpg",
  ],
  ratingTomas: 8.5,
  ratingInes: 8.5,
},
{
  id: "g-lingua-madre-2026-06-12",
  section: "gastronomia",
  title: "Língua Madre",
  date: "2026-06-12",
  place: "Língua Madre",
  description:
    "Atendimento top para trocar cromos, mas comida péssima para um italiano.",
  photos: [
    "/photos/lingua-madre1.jpg",
    "/photos/lingua-madre2.jpg",
    "/photos/lingua-madre3.jpg",
  ],
  ratingTomas: 6.5,
  ratingInes: 6.5,
},
{
  id: "g-o-canoa-2026-04-17",
  section: "gastronomia",
  title: "O Canoa",
  date: "2026-04-17",
  place: "O Canoa",
  description:
    "Um clássico de Setúbal que a Inês não adorou. Raspámos o molho com pão.",
  photos: [
    "/photos/o-canoa1.jpg",
    "/photos/o-canoa2.jpg",
  ],
  ratingTomas: 9,
  ratingInes: 8,
},
{
  id: "g-sushima-2026-06-25",
  section: "gastronomia",
  title: "Sushima",
  date: "2026-06-25",
  place: "Sushima",
  description:
    "Restaurante de sushi sólido em Setúbal. Só perde para o Kodashi.",
  photos: [
    "/photos/sushima1.jpg",
    "/photos/sushima2.jpg",
  ],
  ratingTomas: 8.5,
  ratingInes: 8.5,
},
  {
    id: "g-moments-lounge-tapas",
    section: "gastronomia",
    title: "Jantar — Moments Lounge Tapas",
    date: "2025-10-02",// mete a data quando quiseres (ex: "2025-12-24")
    place: "Moments Lounge Tapas",
    description: "Segunda reunião. Polvo e tataki de atum. Sangria louca.",
    photos: ["/photos/moments1.jpg", "/photos/moments2.jpg"],
    ratingInes: "7.5",
    ratingTomas: "7.5",
  },
  {
    id: "g-kamagami-ramen-2025-10-06",
    section: "gastronomia",
    title: "Jantar — Kamagami Ramen",
    date: "2025-10-06",
    place: "Kamagami Ramen",
    description:
      "Depois de um dia de praia fomos comer um belo ramen e uma bebida horripilante.",
    photos: ["/photos/ramen1.jpg"],
    ratingInes: "7",
    ratingTomas: "7",
  },

  {
  id: "g-o-cruzamento-2025-10-18",
  section: "gastronomia",
  title: "Almoço — O Cruzamento",
  date: "2025-10-18",
  place: "O Cruzamento",
  description:
    "Carne muito boa e ótima relação qualidade/preço.",
  photos: ["/photos/cruzamento1.jpg"],
  ratingInes: "7",
  ratingTomas: "8",
},
{
  id: "g-torreao-tio-joaquim-2025-10-18",
  section: "gastronomia",
  title: "Torreão / Ti Joaquim",
  date: "2025-10-18",
  place: "Torreão / Ti Joaquim",
  description:
    "Comemos migas e feijoada de búzios ao pé da praia dos Buzinhos, onde fomos muito felizes.",
  photos: ["/photos/otorreao.jpg"],
  ratingInes: "8.5",
  ratingTomas: "8.5",
},

{
  id: "g-jncquoi-comporta-2025-10-19",
  section: "gastronomia",
  title: "Jantar — JNcQUOI Comporta",
  date: "2025-10-19",
  place: "JNcQUOI Comporta",
  description:
    "Comida overpriced mas muito boa. Troquei a faca da minha mulher de madeira para metal pela primeira vez ahaha. Sobremesa aterradora, mas também porque já estávamos muito cheios.",
  photos: [
    "/photos/jncquoi1.jpg",
    "/photos/jncquoi2.jpg",
    "/photos/jncquoi3.jpg",
    "/photos/jncquoi4.jpg",
  ],
  ratingInes: "7",
  ratingTomas: "7",
},
{
  id: "g-barista-gastrobar-2025-10-22",
  section: "gastronomia",
  title: "Barista Gastrobar",
  date: "2025-10-22",
  place: "Setúbal",
  description:
    "Comida venezuelana — bem diferente e inspirador para futuros cozinhados. Bebidas com expectativa elevada mas não grande coisa.",
  photos: ["/photos/gastrobar1.jpg"],
  ratingInes: "8",
  ratingTomas: "7.5",
},

{
  id: "g-zama-beach-club-2025-10-24",
  section: "gastronomia",
  title: "Zama Beach Club",
  date: "2025-10-24",
  place: "Zama Beach Club",
  description:
    "Comida horrível, mas valeu pelo stand-up de qualidade e pela companhia como sempre.",
  photos: ["/photos/zama1.jpg"],
  ratingInes: "6.5",
  ratingTomas: "6.5",
},
{
  id: "g-stack-smash-burgers-2025-10-27",
  section: "gastronomia",
  title: "Stack Smash Burgers",
  date: "2025-10-27",
  place: "Stack Smash Burgers",
  description:
    "Hambúrgueres muito bons depois do trabalho — confortante.",
  photos: ["/photos/stack1.jpg"],
  ratingInes: "8",
  ratingTomas: "8",
},



  // -----------------
  // EXPERIÊNCIAS
  // -----------------
  {
    id: "e-cruzes-praia-2025-10-06",
    section: "experiencias",
    title: "Cruzes e praia",
    place: "Setúbal",
    dateStart: "2025-10-06",
    dateEnd: "",

    descTomas:
      "Foi um dia absurdo, nunca pensei ter tanta conexão com uma pessoa logo nos primeiros tempos e ter o à-vontade para fazer atividades que para mim são tão pessoais como trilhas e praia.",
    descInes: "⏳ loading…",

    photos: [
      "/photos/cruzes1.jpg",
      "/photos/cruzes2.jpg",
      "/photos/cruzes3.jpg",
      "/photos/praia1.jpg",
      "/photos/praia2.jpg",
      "/photos/praia3.jpg",
    ],
    videos: [],
  },
  {
    id: "e-tenis-2025-10-01",
    section: "experiencias",
    title: "Primeira vez a jogarmos ténis",
    place: "",
    dateStart: "2025-10-01",
    dateEnd: "",

    descTomas:
      "Não há registos deste momento pois ainda estávamos muitos nervosos, mas para uma segunda reunião tivemos uma intrusão desportiva como nunca antes visto.",
    descInes: "⏳ loading…",

    photos: ["/photos/tenis1.PNG"],
    videos: ["/videos/tenisvideo.MOV"], // ⚠️ recomenda-se MP4 (MOV pode falhar no Chrome)
  },
{
  id: "e-ares-do-monte-2025-10-18",
  section: "experiencias",
  title: "Ares do Monte — Turismo Rural",
  place: "Ares do Monte",
  dateStart: "2025-10-18",
  dateEnd: "2025-10-19",
  descTomas:
    "Ficámos de 18 a 19 e fomos muito bem recebidos. Ótimo pequeno-almoço e uma vista incrível.",
  descInes: "⏳ loading…",
  photos: [
    "/photos/aresdomonte1.jpg",
    "/photos/aresdomonte2.jpg",
    "/photos/aresdomonte3.jpg",
  ],
  videos: [],
},
{
  id: "e-badoca-2025-10-19",
  section: "experiencias",
  title: "Badoca",
  place: "Badoca Safari Park",
  dateStart: "2025-10-19",
  dateEnd: "",
  descTomas:
    "Experiência muito gira e uma iniciação para um dia irmos à Tanzânia.",
  descInes: "⏳ loading…",
  photos: [
    "/photos/badoca1.jpg",
    "/photos/badoca2.jpg",
    "/photos/badoca3.jpg",
    "/photos/badoca4.jpg",
    "/photos/badoca5.jpg",
  ],
  videos: [],
},


];

function formatDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateRange(start, end) {
  if (!start) return "—";
  if (!end || end === start) return formatDate(start);

  const s = start.split("-").map(Number);
  const e = end.split("-").map(Number);

  const sameMonth = s[0] === e[0] && s[1] === e[1];
  if (sameMonth) {
    const monthYear = new Date(e[0], e[1] - 1, e[2]).toLocaleDateString("pt-PT", {
      month: "long",
      year: "numeric",
    });
    return `${s[2]}–${e[2]} ${monthYear}`;
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
}

function fmtRating(x) {
  if (x === null || x === undefined || x === "") return "—";

  const n = Number(x);
  if (Number.isFinite(n) && String(x).trim() !== "") {
    return String(x).replace(".", ",");
  }

  return String(x);
}

function getSortDate(entry) {
  const d =
    entry.section === "gastronomia"
      ? entry.date
      : entry.dateStart;

  // datas vazias vão para o fim
  return d && d.length ? d : "0000-00-00";
}

export default function App() {
  const [activeSection, setActiveSection] = useState("gastronomia");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);

  const [dbRestaurants, setDbRestaurants] = useState([]);

useEffect(() => {
  async function loadRestaurants() {
    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Erro ao carregar restaurantes:", error);
      return;
    }

    const mapped = (data || []).map((r) => ({
      id: r.id,
      section: "gastronomia",
      title: r.title,
      date: r.date || "",
      place: r.place || "",
      description: r.description || "",
      photos: r.photos || [],
      videos: r.videos || [],
      ratingTomas: r.rating_tomas,
      ratingInes: r.rating_ines,
    }));

    setDbRestaurants(mapped);
  }

  loadRestaurants();
}, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

   return [...dbRestaurants, ...ENTRIES]
      .filter((e) => e.section === activeSection)
      .filter((e) => {
        if (!q) return true;

        const hay =
          e.section === "gastronomia"
            ? [
                e.title,
                e.place,
                e.description,
                e.date,
                e.ratingInes,
                e.ratingTomas,
              ].join(" ")
            : [
                e.title,
                e.place,
                e.dateStart,
                e.dateEnd,
                e.descTomas,
                e.descInes,
              ].join(" ");

        return hay.toLowerCase().includes(q);
      })
      .sort((a, b) => (getSortDate(a) < getSortDate(b) ? 1 : -1));
  }, [activeSection, query]);

  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <span className="brand__dot" />
            <span className="brand__name">Memórias</span>
          </div>
          <div className="headerActions">
  <a className="manageButton" href="/admin">
    Manage
  </a>
  <div className="muted small">feito a dois</div>
</div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>As nossas memórias</h1>
          <p>Gastronomia e experiências — guardadas num só lugar.</p>
        </section>

        <section className="controls">
          <div className="tabs" role="tablist" aria-label="Secções">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                className={`tab ${activeSection === s.key ? "is-active" : ""}`}
                onClick={() => setActiveSection(s.key)}
                role="tab"
                aria-selected={activeSection === s.key}
              >
                {s.label}
              </button>
            ))}
          </div>

          <input
            className="search"
            placeholder="Pesquisar (ex.: Setúbal, ramen, praia)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Pesquisar memórias"
          />
        </section>

        <section className="grid">
          {filtered.map((e) => (
            <article
              key={e.id}
              className="card"
              onClick={() => setOpen(e)}
              role="button"
              tabIndex={0}
            >
              <div className="thumb">
                {e.photos?.[0] ? (
                  <img src={e.photos[0]} alt={e.title} loading="lazy" />
                ) : (
                  <div className="thumb__empty">
                    {e.section === "gastronomia" ? "🍽️" : "✨"}
                  </div>
                )}
              </div>

              <div className="card__body">
                <div className="meta">
                  {e.section === "gastronomia" ? (
                    <>
                      <span>{formatDate(e.date)}</span>
                      {e.place ? <span>• {e.place}</span> : null}
                    </>
                  ) : (
                    <>
                      <span>{formatDateRange(e.dateStart, e.dateEnd)}</span>
                      {e.place ? <span>• {e.place}</span> : null}
                    </>
                  )}
                </div>

                <h3>{e.title}</h3>

                {e.section === "gastronomia" ? (
                  <>
                    <p className="excerpt">{e.description}</p>
                    <div className="ratings">
                      <span className="badge">Inês: {fmtRating(e.ratingInes)}</span>
                      <span className="badge">Tomás: {fmtRating(e.ratingTomas)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="excerpt">
                      <span className="muted">Tomás:</span> {e.descTomas}
                    </p>
                    <p className="excerpt">
                      <span className="muted">Inês:</span> {e.descInes}
                    </p>
                    {e.videos?.length ? (
                      <div className="miniBadgeRow">
                        <span className="miniBadge">🎥 {e.videos.length} vídeo(s)</span>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </article>
          ))}

          {!filtered.length ? (
            <div className="empty">
              <p>Sem resultados nesta secção.</p>
            </div>
          ) : null}
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span className="muted small">© {new Date().getFullYear()}</span>
          <span className="muted small">um site só nosso</span>
        </div>
      </footer>

      {open ? (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          onClick={(ev) => {
            if (ev.target.classList.contains("modal")) setOpen(null);
          }}
        >
          <div className="modal__panel">
            <button
              className="modal__close"
              onClick={() => setOpen(null)}
              aria-label="Fechar"
            >
              ✕
            </button>

            <div className="modal__head">
              <div className="meta">
                {open.section === "gastronomia" ? (
                  <>
                    <span>{formatDate(open.date)}</span>
                    {open.place ? <span>• {open.place}</span> : null}
                  </>
                ) : (
                  <>
                    <span>{formatDateRange(open.dateStart, open.dateEnd)}</span>
                    {open.place ? <span>• {open.place}</span> : null}
                  </>
                )}
              </div>
              <h2>{open.title}</h2>
            </div>

            {open.section === "gastronomia" ? (
              <>
                <p className="modal__text">{open.description}</p>

                <div className="ratings ratings--modal">
                  <span className="badge">Inês: {fmtRating(open.ratingInes)}</span>
                  <span className="badge">Tomás: {fmtRating(open.ratingTomas)}</span>
                </div>
              </>
            ) : (
              <div className="twoCol">
                <div className="col">
                  <h3 className="colTitle">Tomás</h3>
                  <p className="modal__text">{open.descTomas}</p>
                </div>
                <div className="col">
                  <h3 className="colTitle">Inês</h3>
                  <p className="modal__text">{open.descInes}</p>
                </div>
              </div>
            )}

            {/* ✅ Vídeos aparecem em ambas as secções */}
            {open.videos?.length ? (
              <div className="videoGrid">
                {open.videos.map((src) => (
                  <video
                    key={src}
                    src={src}
                    controls
                    playsInline
                    preload="metadata"
                  />
                ))}
              </div>
            ) : null}

            {open.photos?.length ? (
              <div className="gallery">
                {open.photos.map((src) => (
                  <img key={src} src={src} alt={open.title} loading="lazy" />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
