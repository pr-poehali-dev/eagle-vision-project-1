import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const images = [
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/de9df55a-afa8-41ec-8dbe-a1fa5bc9e2c3.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/0ea442ea-5114-45f2-a858-cbdadb258def.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/1978a800-0bdf-4ebe-9990-f09465e418d1.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/87ea1773-9133-4f1e-9c22-f49a8e522e7c.jpg',
];

const breeds = [
  { name: 'Бордер-колли', rank: 1, trait: 'Гений среди собак' },
  { name: 'Пудель', rank: 2, trait: 'Умный и легко обучаемый' },
  { name: 'Немецкая овчарка', rank: 3, trait: 'Мастер дрессировки' },
  { name: 'Золотистый ретривер', rank: 4, trait: 'Отличник по послушанию' },
  { name: 'Доберман', rank: 5, trait: 'Быстро схватывает команды' },
  { name: 'Лабрадор', rank: 7, trait: 'Дружелюбный и послушный' },
  { name: 'Чау-чау', rank: 76, trait: 'Независимый характер' },
  { name: 'Мопс', rank: 57, trait: 'Живёт по своим правилам' },
];

const navLinks = [
  { href: '#research', label: 'Обзор' },
  { href: '#breeds', label: 'Рейтинг пород' },
  { href: '#character', label: 'Характер' },
  { href: '#methods', label: 'Методы' },
  { href: '#sources', label: 'Источники' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-16">
          <a href="#" className="text-sm font-semibold text-white">
            🐾 <span className="ml-1 text-amber-400">Собаки и обучаемость</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Меню"
          >
            <span className={cn('block h-0.5 w-6 bg-white transition-all', menuOpen && 'translate-y-2 rotate-45')} />
            <span className={cn('block h-0.5 w-6 bg-white transition-all', menuOpen && 'opacity-0')} />
            <span className={cn('block h-0.5 w-6 bg-white transition-all', menuOpen && '-translate-y-2 -rotate-45')} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 px-8 pb-6 pt-4 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          {images.map((src, index) => (
            <div
              key={src}
              className={cn(
                'absolute inset-0 transition-opacity duration-1000 ease-in-out',
                currentIndex === index ? 'opacity-100' : 'opacity-0'
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-8 md:px-16">
            <div
              className={cn(
                'flex max-w-2xl flex-col gap-8 transform transition-all duration-1000 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              )}
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium text-white/80">🐾 Школьный исследовательский проект</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Порода собаки и её{' '}
                <span className="text-amber-400">обучаемость</span>
              </h1>

              <p className="text-lg font-light leading-relaxed text-white/70 md:text-xl">
                Влияет ли порода на то, насколько легко собаку можно дрессировать?
                Исследуем науку, рейтинги и факты о самых умных и своенравных породах.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#research"
                  className="rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-amber-300"
                >
                  Читать исследование
                </a>
                <a
                  href="#breeds"
                  className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
                >
                  Рейтинг пород
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-1 transition-all duration-300',
                currentIndex === index ? 'w-12 bg-white' : 'w-8 bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Section 1 — Порода как фактор обучаемости */}
      <section id="research" className="bg-zinc-950 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Глава 1</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Порода как фактор обучаемости
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Обзор литературных данных</p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 text-4xl">🧬</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Генетическая основа</h3>
              <p className="leading-relaxed text-white/60">
                Породы формировались тысячелетиями под конкретные задачи: охота, пастьба, охрана. Отбор закрепил не только внешние черты, но и особенности поведения и восприимчивость к обучению.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 text-4xl">🧠</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Три типа интеллекта</h3>
              <p className="leading-relaxed text-white/60">
                По Стэнли Корену («Интеллект собак», 1994), интеллект делится на инстинктивный (врождённые навыки), адаптивный (решение новых задач) и рабочий (способность обучаться командам).
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 text-4xl">📊</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Данные исследований</h3>
              <p className="leading-relaxed text-white/60">
                Корен протестировал 138 пород и установил: лучшие собаки усваивают новую команду за 5 повторений, худшие — за 80–100. Разница в 16–20 раз объясняется именно породными особенностями.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-6 text-xl font-semibold text-white">Ключевые выводы литературы</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                'Пастушьи и служебные породы стабильно занимают верхние строчки рейтинга обучаемости',
                'Примитивные и охотничьи породы склонны к независимости, что затрудняет классическую дрессировку',
                'Генетика определяет потенциал, но не гарантирует результат без правильных методов',
                'Учёные отмечают: "трудно обучаемая" порода — не значит "глупая", часто это самостоятельность',
              ].map((point, i) => (
                <div key={i} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-400">{i + 1}</span>
                  <p className="text-white/70">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Breeds Rating */}
      <section id="breeds" className="bg-black px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Рейтинг</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Кто умнее всех?
            </h2>
            <p className="mt-4 text-white/50">По шкале Стэнли Корена — 138 пород от самых обучаемых до самых упрямых</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {breeds.map((breed) => (
              <div key={breed.name} className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-amber-400/30">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-2xl font-bold text-amber-400">
                  #{breed.rank}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{breed.name}</h3>
                  <p className="text-sm text-white/50">{breed.trait}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-8 text-center">
            <p className="text-lg text-white/80">
              💡 <strong className="text-amber-400">Вывод:</strong> Порода действительно влияет на обучаемость, но не определяет её полностью. Воспитание, терпение и правильный подход важны для любой собаки.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Характер */}
      <section id="character" className="bg-zinc-950 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Глава 2</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Роль характера в дрессировке
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Индивидуальные качества собаки важны не меньше породы</p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: '💪',
                title: 'Доминантность',
                text: 'Собаки с выраженным доминантным характером требуют более опытного хозяина и чёткой иерархии. Без этого даже "умная" порода будет игнорировать команды.',
              },
              {
                icon: '😨',
                title: 'Тревожность',
                text: 'Тревожные и пугливые собаки плохо обучаются в стрессовых условиях. Им необходима постепенная социализация и позитивное подкрепление.',
              },
              {
                icon: '🔥',
                title: 'Энергичность',
                text: 'Высокоэнергичные собаки (хаски, джек-рассел) нуждаются в физической нагрузке перед занятиями — иначе концентрация невозможна.',
              },
              {
                icon: '🤝',
                title: 'Привязанность к хозяину',
                text: 'Собаки, ориентированные на человека (лабрадор, ретривер), обучаются быстрее — само одобрение хозяина является для них наградой.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="leading-relaxed text-white/60">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="flex gap-4">
              <div className="text-3xl">🔬</div>
              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">Исследование: порода vs. индивидуальность</h3>
                <p className="leading-relaxed text-white/60">
                  Исследование Притчард и др. (2020) показало: внутри одной породы разброс по обучаемости между отдельными особями может быть таким же большим, как между разными породами. Это подтверждает, что характер конкретной собаки — не менее значимый фактор, чем её порода.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Методы дрессировки */}
      <section id="methods" className="bg-black px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Глава 3</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Методы дрессировки
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Адаптация под индивидуальные потребности питомца</p>
          </div>

          <div className="mb-10 flex flex-col gap-6">
            {[
              {
                num: '01',
                title: 'Позитивное подкрепление',
                badge: 'Универсальный',
                badgeColor: 'bg-green-500/20 text-green-400',
                text: 'Награда (угощение, похвала, игра) за правильное действие. Работает для большинства пород. Особенно эффективен для тревожных собак и пород с мягким характером: ретриверы, спаниели, пудели.',
              },
              {
                num: '02',
                title: 'Метод кликера',
                badge: 'Для активных пород',
                badgeColor: 'bg-blue-500/20 text-blue-400',
                text: 'Звуковой сигнал точно маркирует нужное поведение. Особенно эффективен для высокоинтеллектуальных пород (бордер-колли, пудель) — позволяет обучать сложным трюкам и цепочкам команд.',
              },
              {
                num: '03',
                title: 'Принудительные методы',
                badge: 'Ограниченное применение',
                badgeColor: 'bg-red-500/20 text-red-400',
                text: 'Применение физического давления или коррекции. Современная кинология считает их устаревшими: они повышают тревожность, разрушают доверие и дают худшие долгосрочные результаты. Допустимы только в специализированной служебной подготовке.',
              },
              {
                num: '04',
                title: 'Игровая дрессировка',
                badge: 'Для энергичных пород',
                badgeColor: 'bg-amber-500/20 text-amber-400',
                text: 'Обучение встраивается в игру. Идеально для активных пород (хаски, бельгийская малинуа, терьеры), которым трудно сосредоточиться в статичном формате занятий.',
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-6 rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="hidden shrink-0 text-5xl font-bold text-white/10 md:block">{item.num}</div>
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <span className={cn('rounded-full px-3 py-0.5 text-xs font-medium', item.badgeColor)}>{item.badge}</span>
                  </div>
                  <p className="leading-relaxed text-white/60">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-8">
            <h3 className="mb-4 text-lg font-semibold text-white">📋 Как выбрать метод под свою собаку?</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { label: 'Мягкий, ласковый характер', method: '→ Позитивное подкрепление' },
                { label: 'Высокий интеллект, активность', method: '→ Кликер + усложнение задач' },
                { label: 'Избыток энергии', method: '→ Игровая дрессировка' },
              ].map((row) => (
                <div key={row.label} className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm text-white/50">{row.label}</p>
                  <p className="mt-1 font-medium text-amber-400">{row.method}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sources Section */}
      <section id="sources" className="bg-zinc-950 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Литература</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Источники</h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                num: 1,
                author: 'Корен С.',
                title: 'Интеллект собак: поведение животных и высшая нервная деятельность',
                year: '1994',
                note: 'Основа классификации пород по обучаемости',
              },
              {
                num: 2,
                author: 'Мech Л. Д., Бойтани Л.',
                title: 'Wolves: Behavior, Ecology, and Conservation',
                year: '2003',
                note: 'Эволюционные корни поведения домашних собак',
              },
              {
                num: 3,
                author: 'Американский кинологический клуб (AKC)',
                title: 'Dog Breed Intelligence Rankings',
                year: '2023',
                note: 'akc.org — официальный рейтинг пород',
              },
              {
                num: 4,
                author: 'Horowitz A.',
                title: 'Inside of a Dog: What Dogs See, Smell, and Know',
                year: '2009',
                note: 'Когнитивные способности собак',
              },
              {
                num: 5,
                author: 'Pritchard J. et al.',
                title: 'Individual differences in dog trainability: the role of personality and breed',
                year: '2020',
                note: 'Сравнение роли породы и индивидуального характера',
              },
              {
                num: 6,
                author: 'Hiby E. F., Rooney N. J., Bradshaw J. W. S.',
                title: 'Dog training methods: their use, effectiveness and interaction with behaviour',
                year: '2004',
                note: 'Animal Welfare — сравнение методов дрессировки',
              },
            ].map((src) => (
              <div key={src.num} className="flex gap-5 rounded-xl border border-white/10 bg-white/5 p-6">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-sm font-bold text-amber-400">
                  {src.num}
                </span>
                <div>
                  <p className="font-medium text-white">
                    {src.author} — <span className="italic text-white/80">{src.title}</span> ({src.year})
                  </p>
                  <p className="mt-1 text-sm text-white/40">{src.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 px-8 py-10 text-center">
        <p className="text-white/40 text-sm">
          Школьный исследовательский проект · Гаценко Руслан · 2026
        </p>
      </footer>
    </>
  );
}
