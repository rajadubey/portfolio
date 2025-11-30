const DB_NAME = 'ContactFormDB';
const STORE_NAME = 'submissions';
const DB_VERSION = 1;

interface SubmissionData {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

export const saveSubmission = async (data: Omit<SubmissionData, 'id' | 'timestamp'>): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  const submission: SubmissionData = {
    id: 'last_submission',
    ...data,
    timestamp: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const request = store.put(submission);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getLastSubmission = async (): Promise<SubmissionData | null> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get('last_submission');
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

export const canSubmitForm = async (): Promise<{ canSubmit: boolean; timeRemaining?: number }> => {
  const lastSubmission = await getLastSubmission();
  
  if (!lastSubmission) {
    return { canSubmit: true };
  }

  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  const timeSinceSubmission = Date.now() - lastSubmission.timestamp;
  
  if (timeSinceSubmission >= TWENTY_FOUR_HOURS) {
    return { canSubmit: true };
  }

  return {
    canSubmit: false,
    timeRemaining: TWENTY_FOUR_HOURS - timeSinceSubmission,
  };
};
