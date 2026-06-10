export type Dog = {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight: string;
  gender: 'Samiec' | 'Samiczka';
  size: 'Małe' | 'Średnie' | 'Duże';
  energy: string;
  location: string;
  description: string;
  traits: string[];
  image: string;
};

const imageA = 'data:image/jpeg;base64,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';
const imageB = 'data:image/jpeg;base64,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';
const imageC = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhAPDw8ODw8PDxAPDw8QDw8ODg8QFREWFhUSFRUYHSggGBomGxYVITEhJSkrLi4wFx8zODMsNygtLi0BCgoKDg0OGxAQGi0fHSUtKy0rLS0tLS0tLS0tLS0tKystLS0tLS0tLS0rLS0tLS8tLSstLS0tLS0tLS0tLTctLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBQYEB//EADgQAAEDAgQEBAQFAwQDAAAAAAEAAhEDIQQFEjEGIkFRE2FxgTKRobEUQlLB0SPh8GJykvEHJDP/xAAZAQEAAwEBAAAAAAAAAAAAAAAAQIDBAX/xAAkEQEAAgIDAAICAwEBAAAAAAAAAQIDERIhMQRBIjJRYXEUE//aAAwDAQACEQMRAD8AvcT8J9Fj8S3nPqtjifhKyeJ+IqLJg+kFcZaqmmrbLlCVk5X3DQ39Vn6hWg4Y291pKjWDZVGamyuGiyqM3FioSTL3WC73bKsy9ysosg4a4urbBCyqao5wrnCiygSlU2KPOfRXLlR1zzlUv4mPTcQbKmxRVtiTZU2JN1nHq8pMOn1kmFau+nlzniZ03i6rEblafFIxnMtllY5R6KswmAawc5Gp0tneJ3hW1B7RZot3W9emVol0uSBIXjulAV1TglTQlUJKEqQJUDHJQkclCAQhCAQhCAQhCAQhCBISJUmpSh5hi/hKydccxWrxvwlZV55iqytCWmFbZeqxqtMAFCztqrR8M7e6zjlpeHG291pLNqW7Kqzf4SrZjbKuzZnKVBKuywq8Y2yp8qYrxuySOKo3mCsqOyrqh5grGnsoSc/ZUFX43K+qbFUR+J3qqXWqhxOyqqrCTDQSVbYpTZbg3NDnuG45QqVhaTcDgtIBdBO8QuvHE6bHSQJ+SjY47ne/klZXaSCTBb591P8ASY/lJ4ALAHG979pUDnBmloPkf7pmIzAT03grgzKp1BWd7RHcNKVmepWPisaCQSXEydzfsApqGYidLjDomCIMeiyBzDSRfr3Xb+M1kfCTsCSA4em6rXOvb47XNre/opG1AdiqB73i4O12kHrGzgpcPj9bA8CHizm9dQ3H8Loi7nmi+anLgweYsdpBMFwtOxXcrRMT4pMTHppShNTgpQEIQgEIQgEIQgEIQgRIUpCSFKHl2P8AhKyrzzFanMfhKypHMVWfVodTOitcDsqmmrfB7KFnWVquGhyhZMuWs4ZcNIWks2obsuHMhyldzSq/M3WKqly5aFa9FWZYbKzJspkcE86taeyqCedW9PZQErbFUrRc+qua2xVZhqck9pVLLVJSoy4HoE/MazgAGe9ui6XlrG6th9SqvOcUKbAT8Ttm9SY2VbfjVekcrKnF56GWd9Oigdmbag1McJ6juvNc8z7xcT4DH02c7WGq8uFNrj0OkSVf8GZdicQA5jmhgJDnnVpJHa3WxXPwyzHJ18sVZ01gwtR4DwbX9xum5ialMDUC5kwD1Ej/ALWrwOA0NDSQYCmr5ex4h4t2FpW04d10wjPq39PF+JMwfTdDHUqZ8N9TVWLwAGkSAGgkuuLdp9DW5fxHXo1mUsU1jmvZrD6bjAE38xHlK9jzTg/A1hpqUosQHNqVGvE73m/usrmHBjKI1U2Cq1rCwOlzqjGdWwSSB6bwotjpXHqY7Wrlta/vS7wGOD6Ie12rYarExPX3ge8pKZ1CqwS0kB0juDY/T6LG5BWdha3hOJ8CsCAPyyQths4Gblsh3c/4AfdY1nppaNSKby+mQ+NbDJLLah+odnBWfD+bOLjQqul7fhd+tvQqjxfK41BIB+LT2IufkVzUKzuV0guaQQ9scze4P7eqrGSaztM44tGnoicFx4DEa2Nd3F42XYu+J3G3BManQQhClAQhCAQhCAQhIgEiVEKUPK8yPKVli6602aHkKy4F/dVn1eHVTOytaDoCqqIuFf5fgy8JrcjkfXvC1fDRdAPQqjxGSkGbrScPs0tAPRX0o0TXmFzYqkXWXYxycYUCto0i3ZdQcSFIWhPa0KRxNw51SrOkDCRoClCqmEGKJiy4qRi3QXPmrGpCzuf5g2kA2fiImNz5LO88Y20x15To/MMf13j4R591S8Y1tP8AUPSi7T2kwD+yqM3zUh7abT1E9xe31VzndP8AEYctaRrovh8SSARqaPWCCsrflGnRWIrMS894W4DfjHPrPqeDSDwalRzA4FwvDQfzQY7dx0XrOVDDYamKNGdLBp1uu+o4bk2952C58ooFuEoU9BYIkUyQHQTYujaZk+sLkzJwZpAsXmSBM6RsSe3UD0S15r1CK0i/ctLRxWqYggbwZg9p2UNbP6TSBIPnIC8z/wDIHEGMoMbSw74NQueQxhOpswBPYAd1jsVm1TEU/DdU8Co7SS9xcWy3dstut6z0zmld9vc8XmguQSWjdobqPy/hR5fm1Gt/8qjXOH5DIdHaHAEhZjhhxOGpmo/U7QAHaXND46zO/wDC6WvY8kkRUYdTXjlc6Osj81/dc+S81nTWmOJjo3inLgR4tMASZjtUF/rH3TMPidVJs7sp06gPlJaR8lbPfrBEgis2W2gCoBf02BWYrOIa8X0/h+naalo7gwsdw1iP5XVN+rk3YbMMzHXSeyzWYtq0auqmbTLmflIncdj/AGXTkuYSGBzvilhcNnEbH1gg+y7sfhzUDZBDxIP2IPks+XbTi2nDNXVQpu7g/dXCp+GaOmiwHrJVwvRxfpH+PNy/vP8AoQhCuoEIQgVIlSIBAQhAiVIlUjyXNjyrMA3WpzqmQxZZrbqs+rQ7MObrb8OMGkLDYfcLb8Pu5Qpj1E+L6tRBhTYXDAJKQld1Jq0UOY1DinqN6gK0qQJjApECakusprkjSgV9RYzP8SNbqxuGcrB/q/UtRmNSGwNzb+6864oxwtSBkCwtYnqVyZZ3Z2YK6rtmsVjyajqrZ5Q9w9gA0/MhelcB4Y1KRrVC5zagaS10FrokAjvIt7LyTG1ImBZx0e0tv9F7LwY+MKyNQmwLjL6joHMewAAgeXRTRGV24zE8xFpvqJ2A7f53WI4ozaSQ02A1f6jA3PbylXHFGP8AAY93XkDRN3GdR+jfqvLswzAy50kh01J3kEgBpPe6wtu06dFIisbarDmljcKyhXkkOe9lRpio12rTbuPJVOJ4bwlF7dVV1RrRLmOIi5DWkxsJ+yk4Gw5fzPs3WdI2IDSCSb9yPktxR4dwvM80wXEASSdmuJ+66scTFdOXLMctqyrmIp02mjSLmhoHhtEWuPQi3+AgqkoZ8x1el4ZIDn6ajTZ1M6mtLT/yN/Ir0M4OmGiGgNNjAjdea8YZGWYgVaPK+qBJiASBBJjrH3Kyy0j1piyfTX5LiNRqUj5vZ6jaPsq3O8UGMNTo4Ob7l7TP1cunhSk7UxxnlJBPloEfWVWcYkNZTpgg6nvjz5SQuWPXTKryymA91KeV0VaR7GIj/PJbfKHmoGteP6ggT3GyyGV0g9rD1GlzD1AJAI+y9IyjKy3TUd8WmPUb/NKUm9tQZLxSva8wlMNaANgAF0KOkpF6bywhCEAhClAQhCAQhCAA=';
const imageD = imageA;
const imageE = imageB;
const imageF = imageC;

export const mockedDogs: Dog[] = [
  {
    id: 'burek',
    name: 'Burek',
    breed: 'Border Collie',
    age: '3 lata',
    weight: '18 kg',
    gender: 'Samiec',
    size: 'Średnie',
    energy: 'Wysoki',
    location: 'Warszawa, Mokotów',
    description:
      'Burek to wulkan energii, który kocha długie spacery po lesie i aportowanie. Szuka towarzysza, który dotrzyma mu kroku podczas porannych przebieżek.',
    traits: ['Energiczny', 'Przyjacielski', 'Inteligentny', 'Ciekawski'],
    image: imageA,
  },
  {
    id: 'fela',
    name: 'Fela',
    breed: 'Cavalier King Charles',
    age: '2 lata',
    weight: '8 kg',
    gender: 'Samiczka',
    size: 'Małe',
    energy: 'Średni',
    location: 'Warszawa, Śródmieście',
    description:
      'Fela uwielbia przytulanie i spokojne spacery po parku. Idealna dla kogoś, kto lubi łagodnego towarzysza.',
    traits: ['Łagodna', 'Czuła', 'Słodka', 'Zwinna'],
    image: imageB,
  },
  {
    id: 'rex',
    name: 'Rex',
    breed: 'Owczarek Niemiecki',
    age: '4 lata',
    weight: '32 kg',
    gender: 'Samiec',
    size: 'Duże',
    energy: 'Średni',
    location: 'Warszawa, Wilanów',
    description:
      'Rex to opanowany i lojalny pies, który potrzebuje codziennej dawki ruchu i zabaw z aportem.',
    traits: ['Lojalny', 'Odważny', 'Spokojny', 'Szybki'],
    image: imageC,
  },
  {
    id: 'mila',
    name: 'Mila',
    breed: 'Shih Tzu',
    age: '1,5 roku',
    weight: '6 kg',
    gender: 'Samiczka',
    size: 'Małe',
    energy: 'Niski',
    location: 'Warszawa, Praga',
    description:
      'Mila uwielbia drzemki na kanapie oraz krótkie przechadzki w okolicy. Idealna dla osoby ceniącej spokój.',
    traits: ['Spokojna', 'Czuła', 'Delikatna', 'Towarzyska'],
    image: imageD,
  },
  {
    id: 'tobi',
    name: 'Tobi',
    breed: 'Beagle',
    age: '3 lata',
    weight: '12 kg',
    gender: 'Samiec',
    size: 'Średnie',
    energy: 'Średni',
    location: 'Warszawa, Żoliborz',
    description:
      'Tobi to ciekawski poszukiwacz zapachów, który z chęcią dołączy do twoich rodzinnych spacerów.',
    traits: ['Ciekawski', 'Przyjazny', 'Zabawny', 'Pomysłowy'],
    image: imageE,
  },
  {
    id: 'luna',
    name: 'Luna',
    breed: 'Labrador',
    age: '5 lat',
    weight: '28 kg',
    gender: 'Samiczka',
    size: 'Duże',
    energy: 'Wysoki',
    location: 'Warszawa, Saska Kępa',
    description:
      'Luna to uwielbiająca pływanie i zabawy w wodzie sunia, która potrzebuje aktywnego planu dnia.',
    traits: ['Energetyczna', 'Wodna', 'Radosna', 'Towarzyska'],
    image: imageF,
  },
  {
    id: 'tina',
    name: 'Tina',
    breed: 'Bulldog Francuski',
    age: '2 lata',
    weight: '10 kg',
    gender: 'Samiczka',
    size: 'Małe',
    energy: 'Niski',
    location: 'Warszawa, Ursynów',
    description:
      'Tina to urocza mała bomba z mocnym charakterem. Lubi krótsze spacery i długie przytulanie.',
    traits: ['Pewna siebie', 'Czuła', 'Szybka', 'Wesoła'],
    image: imageA,
  },
  {
    id: 'dex',
    name: 'Dex',
    breed: 'Jack Russell Terrier',
    age: '3 lata',
    weight: '9 kg',
    gender: 'Samiec',
    size: 'Małe',
    energy: 'Wysoki',
    location: 'Warszawa, Wola',
    description:
      'Dex uwielbia aktywność i zabawy. Jest doskonały dla osoby, która chce codziennie biegać i trenować.',
    traits: ['Pełen energii', 'Szybki', 'Zabawny', 'Oddany'],
    image: imageB,
  },
  {
    id: 'nela',
    name: 'Nela',
    breed: 'Golden Retriever',
    age: '4 lata',
    weight: '26 kg',
    gender: 'Samiczka',
    size: 'Duże',
    energy: 'Średni',
    location: 'Warszawa, Kabaty',
    description:
      'Nela to cierpliwa i przyjazna suczka, która świetnie odnajduje się w towarzystwie dzieci.',
    traits: ['Cierpliwa', 'Przyjacielska', 'Mądra', 'Czuła'],
    image: imageA,
  },
  {
    id: 'milo',
    name: 'Milo',
    breed: 'Corgi',
    age: '3,5 roku',
    weight: '11 kg',
    gender: 'Samiec',
    size: 'Średnie',
    energy: 'Średni',
    location: 'Warszawa, Bemowo',
    description:
      'Milo to uroczy towarzysz, który lubi ruch ale też długi odpoczynek w domu.',
    traits: ['Zabawny', 'Łagodny', 'Czujny', 'Towarzyski'],
    image: imageC,
  },
];
