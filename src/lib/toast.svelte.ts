export type Toast = { id: number; message: string };

let nextId = 1;

class ToastStore {
	toasts = $state<Toast[]>([]);

	show(message: string): void {
		const id = nextId++;
		this.toasts = [...this.toasts, { id, message }];
		setTimeout(() => {
			this.toasts = this.toasts.filter((t) => t.id !== id);
		}, 3200);
	}

	dismiss(id: number): void {
		this.toasts = this.toasts.filter((t) => t.id !== id);
	}
}

export const toast = new ToastStore();
