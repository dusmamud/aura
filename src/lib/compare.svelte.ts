const COMPARE_KEY = 'aura-compare';
export const COMPARE_MAX = 3;

function read(): string[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(COMPARE_KEY);
		const parsed = raw ? (JSON.parse(raw) as unknown) : [];
		return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === 'string') : [];
	} catch {
		return [];
	}
}

function write(value: string[]): void {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(COMPARE_KEY, JSON.stringify(value));
	} catch {
		// Storage unavailable — compare list stays in memory for this session.
	}
}

class CompareStore {
	list = $state<string[]>(read());

	add(slug: string): boolean {
		if (this.list.includes(slug)) return true;
		if (this.list.length >= COMPARE_MAX) return false;
		this.list = [...this.list, slug];
		write(this.list);
		return true;
	}

	remove(slug: string): void {
		this.list = this.list.filter((s) => s !== slug);
		write(this.list);
	}

	toggle(slug: string): boolean {
		if (this.list.includes(slug)) {
			this.remove(slug);
			return true;
		}
		return this.add(slug);
	}

	isCompared(slug: string): boolean {
		return this.list.includes(slug);
	}

	clear(): void {
		this.list = [];
		write(this.list);
	}
}

export const compareStore = new CompareStore();
