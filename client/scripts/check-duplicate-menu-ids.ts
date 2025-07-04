import { SideMenuSectionsData } from '../src/app/components/side-menu/data/menu-data.data';

function collectIds(data: any): string[] {
  const ids: string[] = [];

  for (const section of data) {
    for (const item of section.items ?? []) {
      if ('id' in item && item.id) {
        ids.push(item.id);
      }
    }
  }

  return ids;
}

function checkForDuplicates(ids: string[]) {
  const seen = new Set<string>();
  const duplicates: string[] = [];

  for (const id of ids) {
    if (seen.has(id)) {
      duplicates.push(id);
    } else {
      seen.add(id);
    }
  }

  return duplicates;
}

const allIds = collectIds(SideMenuSectionsData);
const duplicates = checkForDuplicates(allIds);

if (duplicates.length > 0) {
  console.error(`❌ Duplicate menu item IDs found:\n${duplicates.join('\n')}`);
  process.exit(1);
} else {
  console.log('✅ All menu item IDs are unique.');
}
