import moment from 'moment';

export function dispDayName(i) {
  switch (i) {
    case 0: return 'Lundi';
    case 1: return 'Mardi';
    case 2: return 'Mercredi';
    case 3: return 'Jeudi';
    case 4: return 'Vendredi';
    case 5: return 'Samedi';
    case 6: return 'Dimanche';
    default: return '';
  }
}

export function dispSupport(s) {
  switch (s) {
    case 'mtb': return 'VTT';
    case 'road': return 'Route';
    case 'run': return 'Course à pied';
    case 'ht': return 'Home Trainer';
    case 'swim': return 'Natation';
    case 'skix': return 'Ski de fond';
    case 'endr': return 'Enduro';
    case 'othr': return 'Autre';
    default: return '';
  }
}

export function dispDistance(meters) {
  return `${(meters / 1000).toFixed(2)}km`;
}

export function dispType(t) {
  switch (t) {
    case 'wk': return 'Entrainement';
    case 'rc': return 'Compétition';
    case 'nth': return 'Repos';
    default: return '';
  }
}

export function getNextMonday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + (8 - now.getDay()));
}

export function getPreviousMonday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + (8 - now.getDay()));
}

export function dispDate(d) {
  return moment(d).format('DD/MM/YYYY');
}

export function dispDuration(d) {
  return moment.utc(d * 1000).format('HH:mm:ss');
}

export function getFitSupport(s) {
  switch (s) {
    case 'cycling': return 'road';
    default: return 'road';
  }
}

export function dispElevation(e) {
  return `${e}m`;
}

export function dispCalories(c) {
  return `${c}kcal`;
}

export function dispPower(p) {
  return `${p}W`;
}
