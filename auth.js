// ============================================================
//  auth.js — Supabase Auth + Habit Hero (Cloud Sync)
// ============================================================

// 1. Supabase Client
const supabaseUrl = 'https://ccnhrrjevjqbqhqhrtdul.supabase.co';
const supabaseKey = 'sb_publishable_3d62WDRM2NwNHeydCNOYCw_vkxaH4hY';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// ---- AUTH FUNCTIONS ----

async function authSignup(email, password) {
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}

async function authLogin(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

async function authLoginGoogle() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Redirect to the Habit Hero page
            redirectTo: window.location.origin + window.location.pathname
        }
    });
    if (error) throw error;
    return data;
}

async function authLogout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    window.location.reload(); // Reload to clear state/reset to guest
}

async function getUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}

function onAuthChange(callback) {
    supabaseClient.auth.onAuthStateChange((_event, session) => {
        callback(session ? session.user : null);
    });
}

// ---- DATA SYNC (Cloud vs Local) ----

const TABLE_NAME = 'geo_flashcard_app_user_progress'; // Reusing existing table for now
const COLUMN_NAME = 'study_data'; // Reusing existing column

async function loadUserData(userId) {
    if (!userId) return null;

    try {
        const { data, error } = await supabaseClient
            .from(TABLE_NAME)
            .select(COLUMN_NAME)
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found" (new user)
            console.error("Error loading cloud data:", error);
            return null;
        }

        if (data && data[COLUMN_NAME]) {
            console.log("☁️ Loaded Habit Hero data from cloud");
            return data[COLUMN_NAME];
        }
    } catch (err) {
        console.error("Unexpected error loading data:", err);
    }
    return null;
}

async function saveUserData(userId, state) {
    if (!userId) return; // Guests save to localStorage only (handled in app.js)

    try {
        const { error } = await supabaseClient
            .from(TABLE_NAME)
            .upsert({
                user_id: userId,
                [COLUMN_NAME]: state,
                updated_at: new Date().toISOString()
            });

        if (error) console.error("Cloud Save Error:", error);
    } catch (err) {
        console.error("Unexpected error saving data:", err);
    }
}

// Global Auth State
var currentUser = null;

// Initialize Auth
async function initAuth() {
    currentUser = await getUser();
    console.log("Auth Types:", currentUser ? "User Logged In" : "Guest Mode");

    // Setup listener for future changes
    onAuthChange((user) => {
        if ((currentUser && !user) || (!currentUser && user) || (currentUser && user && currentUser.id !== user.id)) {
            // User changed or logged out/in
            window.location.reload();
        }
        currentUser = user;
    });

    return currentUser;
}
