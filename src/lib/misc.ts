function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
}

export { getInitials };
