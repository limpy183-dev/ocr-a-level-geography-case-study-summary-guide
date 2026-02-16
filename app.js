// ===== ACCENT COLOR SYSTEM =====
const ACCENT_COLORS = {
    green: { 500: '#22c55e', 600: '#16a34a', 400: '#4ade80', 100: '#dcfce7', 50: '#f0fdf4' },
    blue: { 500: '#3b82f6', 600: '#2563eb', 400: '#60a5fa', 100: '#dbeafe', 50: '#eff6ff' },
    purple: { 500: '#8b5cf6', 600: '#7c3aed', 400: '#a78bfa', 100: '#ede9fe', 50: '#f5f3ff' },
    red: { 500: '#ef4444', 600: '#dc2626', 400: '#f87171', 100: '#fee2e2', 50: '#fef2f2' },
    yellow: { 500: '#eab308', 600: '#ca8a04', 400: '#facc15', 100: '#fef9c3', 50: '#fefce8' },
    pink: { 500: '#ec4899', 600: '#db2777', 400: '#f472b6', 100: '#fce7f3', 50: '#fdf2f8' },
    cyan: { 500: '#06b6d4', 600: '#0891b2', 400: '#22d3ee', 100: '#cffafe', 50: '#ecfeff' }
};

function setAccent(color) {
    var c = ACCENT_COLORS[color]; if (!c) return;
    var r = document.documentElement.style;
    r.setProperty('--accent-500', c[500]);
    r.setProperty('--accent-600', c[600]);
    r.setProperty('--accent-400', c[400]);
    r.setProperty('--accent-100', c[100]);
    r.setProperty('--accent-50', c[50]);
    document.querySelectorAll('.accent-swatch').forEach(function (s) {
        s.classList.remove('border-gray-800'); s.classList.add('border-transparent');
        s.querySelector('.accent-check').classList.add('hidden');
    });
    var active = document.querySelector('.accent-swatch[data-accent="' + color + '"]');
    if (active) { active.classList.remove('border-transparent'); active.classList.add('border-gray-800'); active.querySelector('.accent-check').classList.remove('hidden'); }
    appState.accentColor = color; saveState();
}

// ===== GRAPH PRESET COLORS =====
const PRESET_COLORS = {
    'blue-purple': { border: '#8b5cf6', bg: 'rgba(139,92,246,0.2)', border2: '#3b82f6', bg2: 'rgba(59,130,246,0.2)' },
    'green-teal': { border: '#14b8a6', bg: 'rgba(20,184,166,0.2)', border2: '#22c55e', bg2: 'rgba(34,197,94,0.2)' },
    'yellow-orange': { border: '#f97316', bg: 'rgba(249,115,22,0.2)', border2: '#eab308', bg2: 'rgba(234,179,8,0.2)' }
};

// ===== 200 ACHIEVEMENTS =====
const ACHIEVEMENTS = [
    // --- Streak Milestones (15) ---
    { id: 'first_flame', name: 'First Flame', icon: 'fa-fire', desc: 'Complete your first habit', check: s => s.totalHabitsCompleted >= 1 },
    { id: 'three_day', name: 'Three-Peat', icon: 'fa-3', desc: '3-day streak', check: s => s.longestStreak >= 3 },
    { id: 'five_alive', name: 'High Five', icon: 'fa-hand', desc: '5-day streak', check: s => s.longestStreak >= 5 },
    { id: 'week_warrior', name: 'Week Warrior', icon: 'fa-calendar-week', desc: '7-day streak', check: s => s.longestStreak >= 7 },
    { id: 'ten_days', name: 'Perfect Ten', icon: 'fa-10', desc: '10-day streak', check: s => s.longestStreak >= 10 },
    { id: 'fortnight_fighter', name: 'Fortnight Fighter', icon: 'fa-shield-halved', desc: '14-day streak', check: s => s.longestStreak >= 14 },
    { id: 'three_weeks', name: 'Three Week Hero', icon: 'fa-bolt', desc: '21-day streak', check: s => s.longestStreak >= 21 },
    { id: 'monthly_master', name: 'Monthly Master', icon: 'fa-calendar-check', desc: '30-day streak', check: s => s.longestStreak >= 30 },
    { id: 'forty_five', name: '45-Day Legend', icon: 'fa-fire-flame-curved', desc: '45-day streak', check: s => s.longestStreak >= 45 },
    { id: 'sixty_days', name: 'Two Month Titan', icon: 'fa-mountain', desc: '60-day streak', check: s => s.longestStreak >= 60 },
    { id: 'ninety_days', name: 'Quarter Master', icon: 'fa-trophy', desc: '90-day streak', check: s => s.longestStreak >= 90 },
    { id: 'century_club', name: 'Century Club', icon: 'fa-star', desc: '100-day streak', check: s => s.longestStreak >= 100 },
    { id: 'half_year', name: 'Half Year Hero', icon: 'fa-sun', desc: '180-day streak', check: s => s.longestStreak >= 180 },
    { id: 'year_long', name: 'Year-Long Legend', icon: 'fa-earth-americas', desc: '365-day streak', check: s => s.longestStreak >= 365 },
    { id: 'two_years', name: 'Unstoppable Force', icon: 'fa-infinity', desc: '730-day streak', check: s => s.longestStreak >= 730 },
    // --- Total Completions (20) ---
    { id: 'first_step', name: 'First Step', icon: 'fa-shoe-prints', desc: 'Complete 1 habit', check: s => s.totalHabitsCompleted >= 1 },
    { id: 'getting_started', name: 'Getting Started', icon: 'fa-play', desc: 'Complete 5 habits', check: s => s.totalHabitsCompleted >= 5 },
    { id: 'dozen_doer', name: 'Dozen Doer', icon: 'fa-dice', desc: 'Complete 12 habits', check: s => s.totalHabitsCompleted >= 12 },
    { id: 'quarter_century', name: 'Quarter Century', icon: 'fa-flag', desc: 'Complete 25 habits', check: s => s.totalHabitsCompleted >= 25 },
    { id: 'half_century', name: 'Half Century', icon: 'fa-star-half-stroke', desc: 'Complete 50 habits', check: s => s.totalHabitsCompleted >= 50 },
    { id: 'seventy_five', name: 'Diamond Player', icon: 'fa-diamond', desc: 'Complete 75 habits', check: s => s.totalHabitsCompleted >= 75 },
    { id: 'centurion', name: 'Centurion', icon: 'fa-medal', desc: 'Complete 100 habits', check: s => s.totalHabitsCompleted >= 100 },
    { id: 'one_fifty', name: 'Dedicated Soul', icon: 'fa-heart', desc: 'Complete 150 habits', check: s => s.totalHabitsCompleted >= 150 },
    { id: 'two_hundred', name: 'Habit Machine', icon: 'fa-robot', desc: 'Complete 200 habits', check: s => s.totalHabitsCompleted >= 200 },
    { id: 'three_hundred', name: 'Triple Threat', icon: 'fa-layer-group', desc: 'Complete 300 habits', check: s => s.totalHabitsCompleted >= 300 },
    { id: 'five_hundred', name: '500 Club', icon: 'fa-ranking-star', desc: 'Complete 500 habits', check: s => s.totalHabitsCompleted >= 500 },
    { id: 'seven_fifty', name: 'Legendary', icon: 'fa-dragon', desc: 'Complete 750 habits', check: s => s.totalHabitsCompleted >= 750 },
    { id: 'thousand_strong', name: 'Thousand Strong', icon: 'fa-crown', desc: 'Complete 1000 habits', check: s => s.totalHabitsCompleted >= 1000 },
    { id: 'fifteen_hundred', name: 'Elite Performer', icon: 'fa-chess-king', desc: 'Complete 1500 habits', check: s => s.totalHabitsCompleted >= 1500 },
    { id: 'two_thousand', name: 'Grandmaster', icon: 'fa-chess-queen', desc: 'Complete 2000 habits', check: s => s.totalHabitsCompleted >= 2000 },
    { id: 'three_thousand', name: 'Transcendent', icon: 'fa-spa', desc: 'Complete 3000 habits', check: s => s.totalHabitsCompleted >= 3000 },
    { id: 'five_thousand', name: 'Mythical', icon: 'fa-hat-wizard', desc: 'Complete 5000 habits', check: s => s.totalHabitsCompleted >= 5000 },
    { id: 'seven_five_hundred', name: 'Ascended', icon: 'fa-dove', desc: 'Complete 7500 habits', check: s => s.totalHabitsCompleted >= 7500 },
    { id: 'ten_thousand', name: 'Ten Thousand', icon: 'fa-Globe', desc: 'Complete 10000 habits', check: s => s.totalHabitsCompleted >= 10000 },
    { id: 'mega_completions', name: 'Infinite Loop', icon: 'fa-arrows-spin', desc: 'Complete 25000 habits', check: s => s.totalHabitsCompleted >= 25000 },
    // --- Gems Earned (15) ---
    { id: 'penny_pincher', name: 'Penny Pincher', icon: 'fa-coins', desc: 'Earn 100 gems', check: s => s.totalGemsEarned >= 100 },
    { id: 'gem_finder', name: 'Gem Finder', icon: 'fa-magnifying-glass', desc: 'Earn 250 gems', check: s => s.totalGemsEarned >= 250 },
    { id: 'gem_collector', name: 'Gem Collector', icon: 'fa-gem', desc: 'Earn 500 gems', check: s => s.totalGemsEarned >= 500 },
    { id: 'gem_750', name: 'Gem Enthusiast', icon: 'fa-jar', desc: 'Earn 750 gems', check: s => s.totalGemsEarned >= 750 },
    { id: 'diamond_hands', name: 'Diamond Hands', icon: 'fa-diamond', desc: 'Earn 1000 gems', check: s => s.totalGemsEarned >= 1000 },
    { id: 'gem_2k', name: 'Gem Hoarder', icon: 'fa-vault', desc: 'Earn 2000 gems', check: s => s.totalGemsEarned >= 2000 },
    { id: 'gem_3k', name: 'Treasure Seeker', icon: 'fa-compass', desc: 'Earn 3000 gems', check: s => s.totalGemsEarned >= 3000 },
    { id: 'treasure_hoard', name: 'Treasure Hoard', icon: 'fa-sack-dollar', desc: 'Earn 5000 gems', check: s => s.totalGemsEarned >= 5000 },
    { id: 'gem_7500', name: 'Gem Baron', icon: 'fa-building-columns', desc: 'Earn 7500 gems', check: s => s.totalGemsEarned >= 7500 },
    { id: 'gem_lord', name: 'Gem Lord', icon: 'fa-hat-wizard', desc: 'Earn 10000 gems', check: s => s.totalGemsEarned >= 10000 },
    { id: 'gem_15k', name: 'Gem Emperor', icon: 'fa-chess-king', desc: 'Earn 15000 gems', check: s => s.totalGemsEarned >= 15000 },
    { id: 'gem_20k', name: 'Midas Touch', icon: 'fa-hand-sparkles', desc: 'Earn 20000 gems', check: s => s.totalGemsEarned >= 20000 },
    { id: 'gem_50k', name: 'Gem Galaxy', icon: 'fa-meteor', desc: 'Earn 50000 gems', check: s => s.totalGemsEarned >= 50000 },
    { id: 'gem_100k', name: 'Gem Universe', icon: 'fa-rocket', desc: 'Earn 100000 gems', check: s => s.totalGemsEarned >= 100000 },
    { id: 'gem_infinite', name: 'Infinite Wealth', icon: 'fa-infinity', desc: 'Earn 500000 gems', check: s => s.totalGemsEarned >= 500000 },
    // --- Habits Created (12) ---
    { id: 'habit_starter', name: 'Habit Starter', icon: 'fa-seedling', desc: 'Create first habit', check: s => s.habitsCreated >= 1 },
    { id: 'habit_duo', name: 'Dynamic Duo', icon: 'fa-people-arrows', desc: 'Create 2 habits', check: s => s.habitsCreated >= 2 },
    { id: 'habit_builder', name: 'Habit Builder', icon: 'fa-hammer', desc: 'Create 3 habits', check: s => s.habitsCreated >= 3 },
    { id: 'habit_quad', name: 'Quad Squad', icon: 'fa-table-cells', desc: 'Create 4 habits', check: s => s.habitsCreated >= 4 },
    { id: 'habit_architect', name: 'Habit Architect', icon: 'fa-compass-drafting', desc: 'Create 5 habits', check: s => s.habitsCreated >= 5 },
    { id: 'habit_six', name: 'Six Pack', icon: 'fa-grip', desc: 'Create 6 habits', check: s => s.habitsCreated >= 6 },
    { id: 'habit_seven', name: 'Lucky Seven', icon: 'fa-clover', desc: 'Create 7 habits', check: s => s.habitsCreated >= 7 },
    { id: 'habit_eight', name: 'Octet', icon: 'fa-spider', desc: 'Create 8 habits', check: s => s.habitsCreated >= 8 },
    { id: 'habit_empire', name: 'Habit Empire', icon: 'fa-city', desc: 'Create 10 habits', check: s => s.habitsCreated >= 10 },
    { id: 'habit_15', name: 'Habit Mogul', icon: 'fa-briefcase', desc: 'Create 15 habits', check: s => s.habitsCreated >= 15 },
    { id: 'habit_20', name: 'Habit Tycoon', icon: 'fa-landmark', desc: 'Create 20 habits', check: s => s.habitsCreated >= 20 },
    { id: 'habit_25', name: 'Habit Universe', icon: 'fa-globe', desc: 'Create 25 habits', check: s => s.habitsCreated >= 25 },
    // --- Level Milestones (18) ---
    { id: 'level_2', name: 'Leveling Up', icon: 'fa-arrow-up', desc: 'Reach level 2', check: s => s.level >= 2 },
    { id: 'level_3', name: 'Getting Stronger', icon: 'fa-dumbbell', desc: 'Reach level 3', check: s => s.level >= 3 },
    { id: 'level_4', name: 'Apprentice', icon: 'fa-user', desc: 'Reach level 4', check: s => s.level >= 4 },
    { id: 'level_5', name: 'Rising Star', icon: 'fa-arrow-trend-up', desc: 'Reach level 5', check: s => s.level >= 5 },
    { id: 'level_6', name: 'Skilled', icon: 'fa-screwdriver-wrench', desc: 'Reach level 6', check: s => s.level >= 6 },
    { id: 'level_7', name: 'Expert', icon: 'fa-brain', desc: 'Reach level 7', check: s => s.level >= 7 },
    { id: 'level_8', name: 'Specialist', icon: 'fa-microscope', desc: 'Reach level 8', check: s => s.level >= 8 },
    { id: 'level_9', name: 'Professional', icon: 'fa-briefcase', desc: 'Reach level 9', check: s => s.level >= 9 },
    { id: 'level_10', name: 'Veteran', icon: 'fa-user-graduate', desc: 'Reach level 10', check: s => s.level >= 10 },
    { id: 'level_15', name: 'Champion', icon: 'fa-trophy', desc: 'Reach level 15', check: s => s.level >= 15 },
    { id: 'level_20', name: 'Master', icon: 'fa-graduation-cap', desc: 'Reach level 20', check: s => s.level >= 20 },
    { id: 'level_25', name: 'Grandmaster', icon: 'fa-chess-king', desc: 'Reach level 25', check: s => s.level >= 25 },
    { id: 'level_30', name: 'Legend', icon: 'fa-scroll', desc: 'Reach level 30', check: s => s.level >= 30 },
    { id: 'level_40', name: 'Mythic', icon: 'fa-dragon', desc: 'Reach level 40', check: s => s.level >= 40 },
    { id: 'level_50', name: 'Immortal', icon: 'fa-skull', desc: 'Reach level 50', check: s => s.level >= 50 },
    { id: 'level_75', name: 'Celestial', icon: 'fa-sun', desc: 'Reach level 75', check: s => s.level >= 75 },
    { id: 'level_100', name: 'Transcendent', icon: 'fa-atom', desc: 'Reach level 100', check: s => s.level >= 100 },
    { id: 'level_200', name: 'Omnipotent', icon: 'fa-eye', desc: 'Reach level 200', check: s => s.level >= 200 },
    // --- Rewards Claimed (8) ---
    { id: 'first_reward', name: 'First Prize', icon: 'fa-gift', desc: 'Claim 1 reward', check: s => s.claimedRewards.length >= 1 },
    { id: 'reward_duo', name: 'Double Reward', icon: 'fa-gifts', desc: 'Claim 2 rewards', check: s => s.claimedRewards.length >= 2 },
    { id: 'reward_hunter', name: 'Reward Hunter', icon: 'fa-crosshairs', desc: 'Claim 3 rewards', check: s => s.claimedRewards.length >= 3 },
    { id: 'reward_5', name: 'Reward Addict', icon: 'fa-basket-shopping', desc: 'Claim 5 rewards', check: s => s.claimedRewards.length >= 5 },
    { id: 'reward_10', name: 'Reward King', icon: 'fa-crown', desc: 'Claim 10 rewards', check: s => s.claimedRewards.length >= 10 },
    { id: 'reward_15', name: 'Shop-a-holic', icon: 'fa-cart-shopping', desc: 'Claim 15 rewards', check: s => s.claimedRewards.length >= 15 },
    { id: 'reward_20', name: 'Collector Supreme', icon: 'fa-warehouse', desc: 'Claim 20 rewards', check: s => s.claimedRewards.length >= 20 },
    { id: 'reward_30', name: 'Reward Legend', icon: 'fa-medal', desc: 'Claim 30 rewards', check: s => s.claimedRewards.length >= 30 },
    // --- Perfect Days (12) ---
    { id: 'perfect_1', name: 'Perfect Day', icon: 'fa-check', desc: '1 perfect day', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 1 },
    { id: 'perfect_3', name: 'Hat Trick', icon: 'fa-check-double', desc: '3 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 3 },
    { id: 'perfect_5', name: 'High Five Days', icon: 'fa-hand', desc: '5 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 5 },
    { id: 'perfect_7', name: 'Perfect Week', icon: 'fa-calendar-week', desc: '7 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 7 },
    { id: 'perfect_10', name: 'Ten Perfects', icon: 'fa-star', desc: '10 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 10 },
    { id: 'perfect_15', name: 'Perfectionist', icon: 'fa-bullseye', desc: '15 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 15 },
    { id: 'perfect_20', name: 'Flawless Twenty', icon: 'fa-gem', desc: '20 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 20 },
    { id: 'perfect_30', name: 'Perfect Month', icon: 'fa-calendar-check', desc: '30 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 30 },
    { id: 'perfect_50', name: '50 Flawless', icon: 'fa-fire', desc: '50 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 50 },
    { id: 'perfect_75', name: 'Platinum Perfection', icon: 'fa-award', desc: '75 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 75 },
    { id: 'perfect_100', name: 'Century Perfect', icon: 'fa-100', desc: '100 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 100 },
    { id: 'perfect_200', name: '200 Perfect Days', icon: 'fa-crown', desc: '200 perfect days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 200 },
    // --- Comeback / Freeze (10) ---
    { id: 'streak_saver', name: 'Streak Saver', icon: 'fa-snowflake', desc: 'Use a streak freeze', check: s => s.freezesUsed >= 1 },
    { id: 'freeze_2', name: 'Double Freeze', icon: 'fa-icicles', desc: 'Use 2 freezes', check: s => s.freezesUsed >= 2 },
    { id: 'freeze_3', name: 'Triple Freeze', icon: 'fa-igloo', desc: 'Use 3 freezes', check: s => s.freezesUsed >= 3 },
    { id: 'freeze_5', name: 'Ice Master', icon: 'fa-temperature-low', desc: 'Use 5 freezes', check: s => s.freezesUsed >= 5 },
    { id: 'freeze_10', name: 'Frozen Fortress', icon: 'fa-shield-halved', desc: 'Use 10 freezes', check: s => s.freezesUsed >= 10 },
    { id: 'comeback_kid', name: 'Comeback Kid', icon: 'fa-rotate-right', desc: 'Resume after broken streak', check: s => s.comebacks >= 1 },
    { id: 'comeback_3', name: 'Never Give Up', icon: 'fa-person-falling-burst', desc: '3 comebacks', check: s => s.comebacks >= 3 },
    { id: 'comeback_5', name: 'Resilient', icon: 'fa-shield', desc: '5 comebacks', check: s => s.comebacks >= 5 },
    { id: 'comeback_10', name: 'Phoenix', icon: 'fa-feather', desc: '10 comebacks', check: s => s.comebacks >= 10 },
    { id: 'comeback_20', name: 'Eternal Phoenix', icon: 'fa-fire-flame-curved', desc: '20 comebacks', check: s => s.comebacks >= 20 },
    // --- Misc / Engagement (40) ---
    { id: 'night_owl', name: 'Night Owl', icon: 'fa-moon', desc: 'Complete a habit (any time)', check: s => s.totalHabitsCompleted >= 1 },
    { id: 'early_bird', name: 'Early Bird', icon: 'fa-sun', desc: 'Complete 3 habits in one day', check: s => s.habits.filter(h => h.completedToday).length >= 3 },
    { id: 'multi_tasker', name: 'Multi-Tasker', icon: 'fa-list-check', desc: 'Have 3+ active habits', check: s => s.habits.length >= 3 },
    { id: 'diverse', name: 'Well Rounded', icon: 'fa-circle-nodes', desc: 'Have 5+ active habits', check: s => s.habits.length >= 5 },
    { id: 'routine_king', name: 'Routine King', icon: 'fa-repeat', desc: 'Complete all habits 3 days', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 3 },
    { id: 'gem_saver', name: 'Gem Saver', icon: 'fa-piggy-bank', desc: 'Accumulate 200 gems', check: s => s.gems >= 200 },
    { id: 'gem_stash', name: 'Gem Stash', icon: 'fa-vault', desc: 'Accumulate 500 gems', check: s => s.gems >= 500 },
    { id: 'gem_fortune', name: 'Fortune', icon: 'fa-money-bill-wave', desc: 'Accumulate 1000 gems', check: s => s.gems >= 1000 },
    { id: 'gem_mega', name: 'Mega Rich', icon: 'fa-sack-dollar', desc: 'Accumulate 5000 gems', check: s => s.gems >= 5000 },
    { id: 'xp_earner', name: 'XP Earner', icon: 'fa-bolt', desc: 'Earn XP for the first time', check: s => s.xp > 0 || s.level > 1 },
    { id: 'theme_changer', name: 'Style Switch', icon: 'fa-palette', desc: 'Change the theme', check: s => s.darkMode === true },
    { id: 'data_exporter', name: 'Backup Pro', icon: 'fa-download', desc: 'Export your data', check: s => s.dataExported >= 1 },
    { id: 'data_importer', name: 'Data Restorer', icon: 'fa-upload', desc: 'Import data', check: s => s.dataImported >= 1 },
    { id: 'accent_changer', name: 'Color Lover', icon: 'fa-droplet', desc: 'Change accent color', check: s => s.accentColor !== 'green' },
    { id: 'habit_editor', name: 'Fine Tuner', icon: 'fa-pen', desc: 'Edit a habit name', check: s => s.habitsEdited >= 1 },
    { id: 'habit_deleter', name: 'Spring Cleaner', icon: 'fa-broom', desc: 'Delete a habit', check: s => s.habitsDeleted >= 1 },
    { id: 'graph_creator', name: 'Data Visualizer', icon: 'fa-chart-line', desc: 'Create a custom graph', check: s => s.graphsCreated >= 1 },
    { id: 'graph_5', name: 'Chart Master', icon: 'fa-chart-bar', desc: 'Create 5 graphs', check: s => s.graphsCreated >= 5 },
    { id: 'graph_10', name: 'Analytics Pro', icon: 'fa-chart-pie', desc: 'Create 10 graphs', check: s => s.graphsCreated >= 10 },
    { id: 'quick_complete', name: 'Speed Runner', icon: 'fa-gauge-high', desc: 'Complete all habits same day you create one', check: s => s.habits.length > 0 && s.habits.every(h => h.completedToday) },
    { id: 'two_streak', name: 'Double Streak', icon: 'fa-2', desc: '2 habits with 5+ streaks', check: s => s.habits.filter(h => h.streak >= 5).length >= 2 },
    { id: 'three_streak', name: 'Triple Streak', icon: 'fa-3', desc: '3 habits with 5+ streaks', check: s => s.habits.filter(h => h.streak >= 5).length >= 3 },
    { id: 'all_streak_10', name: 'All On Fire', icon: 'fa-fire-flame-curved', desc: 'All habits 10+ streaks', check: s => s.habits.length > 0 && s.habits.every(h => h.streak >= 10) },
    { id: 'consistent_1k', name: 'Consistent', icon: 'fa-wave-square', desc: 'Total streak across all habits 100+', check: s => s.habits.reduce((a, h) => a + h.streak, 0) >= 100 },
    { id: 'mega_streak_sum', name: 'Mega Momentum', icon: 'fa-tornado', desc: 'Total streak across all habits 500+', check: s => s.habits.reduce((a, h) => a + h.streak, 0) >= 500 },
    { id: 'single_50', name: '50-Day Habit', icon: 'fa-flag-checkered', desc: 'Single habit 50 streak', check: s => s.habits.some(h => h.streak >= 50) },
    { id: 'single_100', name: '100-Day Habit', icon: 'fa-mountain-sun', desc: 'Single habit 100 streak', check: s => s.habits.some(h => h.streak >= 100) },
    { id: 'single_365', name: 'Year-Long Habit', icon: 'fa-calendar', desc: 'Single habit 365 streak', check: s => s.habits.some(h => h.streak >= 365) },
    { id: 'partial_10', name: 'Progress Maker', icon: 'fa-circle-half-stroke', desc: '10 partial days', check: s => Object.values(s.completedDays).filter(v => v === 'partial').length >= 10 },
    { id: 'partial_25', name: 'Trying Hard', icon: 'fa-hand-fist', desc: '25 partial days', check: s => Object.values(s.completedDays).filter(v => v === 'partial').length >= 25 },
    { id: 'total_days_10', name: '10 Active Days', icon: 'fa-calendar-days', desc: '10 days with any activity', check: s => Object.keys(s.completedDays).length >= 10 },
    { id: 'total_days_30', name: 'Monthly Active', icon: 'fa-calendar-check', desc: '30 days with activity', check: s => Object.keys(s.completedDays).length >= 30 },
    { id: 'total_days_60', name: 'Two Month Active', icon: 'fa-calendar', desc: '60 active days', check: s => Object.keys(s.completedDays).length >= 60 },
    { id: 'total_days_100', name: 'Century Active', icon: 'fa-hundred-points', desc: '100 active days', check: s => Object.keys(s.completedDays).length >= 100 },
    { id: 'total_days_200', name: '200 Active Days', icon: 'fa-earth-americas', desc: '200 active days', check: s => Object.keys(s.completedDays).length >= 200 },
    { id: 'total_days_365', name: 'Full Year Active', icon: 'fa-earth-europe', desc: '365 active days', check: s => Object.keys(s.completedDays).length >= 365 },
    { id: 'big_gems_habit', name: 'Gem Mine', icon: 'fa-gem', desc: 'Have a 50-gem habit', check: s => s.habits.some(h => h.gems >= 50) },
    { id: 'five_habits_done', name: 'Pentathlon', icon: 'fa-5', desc: 'Complete 5 habits in one day', check: s => s.habits.filter(h => h.completedToday).length >= 5 },
    { id: 'ten_habits_done', name: 'Decathlon', icon: 'fa-medal', desc: 'Complete 10 habits in one day', check: s => s.habits.filter(h => h.completedToday).length >= 10 },
    { id: 'complete_200_day', name: 'Bicentennial', icon: 'fa-landmark-flag', desc: '200 total completions + 30 streak', check: s => s.totalHabitsCompleted >= 200 && s.longestStreak >= 30 },
    // --- Category / Theme Achievements (30) ---
    { id: 'health_habit', name: 'Health Nut', icon: 'fa-heart-pulse', desc: 'Create a health habit', check: s => s.habits.some(h => /run|gym|exercise|workout|health|walk|jog|swim|yoga|stretch|meditat/i.test(h.name)) },
    { id: 'book_worm', name: 'Book Worm', icon: 'fa-book-open', desc: 'Create a reading habit', check: s => s.habits.some(h => /read|book|study|learn|page/i.test(h.name)) },
    { id: 'coder', name: 'Code Warrior', icon: 'fa-code', desc: 'Create a coding habit', check: s => s.habits.some(h => /code|program|develop|script|debug|hack/i.test(h.name)) },
    { id: 'writer', name: 'Wordsmith', icon: 'fa-pen-nib', desc: 'Create a writing habit', check: s => s.habits.some(h => /write|journal|diary|blog|essay|story/i.test(h.name)) },
    { id: 'musician', name: 'Musician', icon: 'fa-music', desc: 'Create a music habit', check: s => s.habits.some(h => /music|piano|guitar|sing|drum|instrument|practice/i.test(h.name)) },
    { id: 'artist', name: 'Creative Soul', icon: 'fa-palette', desc: 'Create an art habit', check: s => s.habits.some(h => /draw|paint|art|sketch|design|craft/i.test(h.name)) },
    { id: 'cook', name: 'Home Chef', icon: 'fa-utensils', desc: 'Create a cooking habit', check: s => s.habits.some(h => /cook|bake|recipe|meal|kitchen/i.test(h.name)) },
    { id: 'sleeper', name: 'Sleep Champion', icon: 'fa-bed', desc: 'Create a sleep habit', check: s => s.habits.some(h => /sleep|bed|rest|nap|wake/i.test(h.name)) },
    { id: 'water', name: 'Hydration Hero', icon: 'fa-glass-water', desc: 'Create a water habit', check: s => s.habits.some(h => /water|drink|hydrat/i.test(h.name)) },
    { id: 'cleaner', name: 'Tidy Up', icon: 'fa-broom', desc: 'Create a cleaning habit', check: s => s.habits.some(h => /clean|tidy|organize|declutter/i.test(h.name)) },
    { id: 'meditator', name: 'Zen Master', icon: 'fa-spa', desc: 'Create a meditation habit', check: s => s.habits.some(h => /meditat|mindful|breath|calm|zen/i.test(h.name)) },
    { id: 'finance', name: 'Money Manager', icon: 'fa-money-bill-wave', desc: 'Create a finance habit', check: s => s.habits.some(h => /save|budget|money|invest|finance|expense/i.test(h.name)) },
    { id: 'social', name: 'Social Butterfly', icon: 'fa-people-group', desc: 'Create a social habit', check: s => s.habits.some(h => /call|friend|family|social|connect|text|chat/i.test(h.name)) },
    { id: 'nature', name: 'Nature Lover', icon: 'fa-tree', desc: 'Create an outdoor habit', check: s => s.habits.some(h => /walk|hike|nature|garden|outdoor|park/i.test(h.name)) },
    { id: 'language', name: 'Polyglot', icon: 'fa-language', desc: 'Create a language habit', check: s => s.habits.some(h => /language|spanish|french|japanese|chinese|german|duolingo|vocab/i.test(h.name)) },
    { id: 'gratitude', name: 'Grateful Heart', icon: 'fa-heart', desc: 'Create a gratitude habit', check: s => s.habits.some(h => /gratitude|thankful|grateful|appreciate/i.test(h.name)) },
    { id: 'prayer', name: 'Devoted', icon: 'fa-pray', desc: 'Create a prayer/spiritual habit', check: s => s.habits.some(h => /pray|worship|spiritual|church|mosque|temple|bible|quran/i.test(h.name)) },
    { id: 'vitamins', name: 'Supplement Star', icon: 'fa-capsules', desc: 'Create a vitamin/supplement habit', check: s => s.habits.some(h => /vitamin|supplement|pill|medicine|capsule/i.test(h.name)) },
    { id: 'photo', name: 'Shutterbug', icon: 'fa-camera', desc: 'Create a photography habit', check: s => s.habits.some(h => /photo|camera|picture|snap/i.test(h.name)) },
    { id: 'gamer', name: 'Gamer', icon: 'fa-gamepad', desc: 'Create a gaming habit', check: s => s.habits.some(h => /game|gaming|play|xbox|playstation|nintendo/i.test(h.name)) },
    { id: 'runner', name: 'Road Runner', icon: 'fa-person-running', desc: 'Running habit with 10 streak', check: s => s.habits.some(h => /run|jog|sprint/i.test(h.name) && h.streak >= 10) },
    { id: 'yoga_master', name: 'Yoga Master', icon: 'fa-person-praying', desc: 'Yoga habit 30 streak', check: s => s.habits.some(h => /yoga|stretch|flexibility/i.test(h.name) && h.streak >= 30) },
    { id: 'reader_50', name: 'Avid Reader', icon: 'fa-book', desc: 'Reading habit 50 streak', check: s => s.habits.some(h => /read|book/i.test(h.name) && h.streak >= 50) },
    { id: 'coder_30', name: 'Code Ninja', icon: 'fa-laptop-code', desc: 'Coding habit 30 streak', check: s => s.habits.some(h => /code|program/i.test(h.name) && h.streak >= 30) },
    { id: 'early_riser_30', name: 'Early Riser', icon: 'fa-clock', desc: 'Wake-up habit 30 streak', check: s => s.habits.some(h => /wake|morning|early/i.test(h.name) && h.streak >= 30) },
    { id: 'no_screen', name: 'Digital Detox', icon: 'fa-mobile-screen', desc: 'Screen time habit', check: s => s.habits.some(h => /screen|phone|digital|detox|offline/i.test(h.name)) },
    { id: 'pet_care', name: 'Pet Parent', icon: 'fa-paw', desc: 'Pet care habit', check: s => s.habits.some(h => /pet|dog|cat|walk.*dog|feed.*pet/i.test(h.name)) },
    { id: 'podcast', name: 'Podcast Listener', icon: 'fa-podcast', desc: 'Podcast habit', check: s => s.habits.some(h => /podcast|listen|audiobook/i.test(h.name)) },
    { id: 'volunteer', name: 'Good Samaritan', icon: 'fa-hand-holding-heart', desc: 'Volunteer habit', check: s => s.habits.some(h => /volunteer|charity|donate|help|community/i.test(h.name)) },
    { id: 'eco', name: 'Eco Warrior', icon: 'fa-leaf', desc: 'Eco-friendly habit', check: s => s.habits.some(h => /recycle|eco|environment|green|sustain|compost/i.test(h.name)) },
    // --- Legendary / Special (20) ---
    { id: 'all_complete_week', name: 'Perfect Week', icon: 'fa-calendar-week', desc: '7 consecutive perfect days', check: s => { var days = Object.entries(s.completedDays).filter(e => e[1] === 'completed').map(e => e[0]); if (days.length < 7) return false; return s.longestStreak >= 7; } },
    { id: 'dedication', name: 'Dedication', icon: 'fa-lock', desc: 'Use app 30+ days', check: s => Object.keys(s.completedDays).length >= 30 },
    { id: 'veteran_user', name: 'Veteran User', icon: 'fa-user-shield', desc: 'Use app 100+ days', check: s => Object.keys(s.completedDays).length >= 100 },
    { id: 'old_timer', name: 'Old Timer', icon: 'fa-hourglass-half', desc: 'Use app 365+ days', check: s => Object.keys(s.completedDays).length >= 365 },
    { id: 'max_gems_habit', name: 'Premium Habit', icon: 'fa-gem', desc: 'Habit worth 30+ gems', check: s => s.habits.some(h => h.gems >= 30) },
    { id: 'diverse_7', name: 'Seven Samurai', icon: 'fa-users', desc: '7+ different habits', check: s => s.habits.length >= 7 },
    { id: 'diverse_10', name: 'Ten Habits', icon: 'fa-table-list', desc: '10+ different habits', check: s => s.habits.length >= 10 },
    { id: 'marathon', name: 'Habit Marathon', icon: 'fa-road', desc: 'Complete 10+ habits in a day', check: s => s.habits.filter(h => h.completedToday).length >= 10 },
    { id: 'night_marathon', name: 'All Nighter', icon: 'fa-moon', desc: 'Complete all 7+ habits', check: s => s.habits.length >= 7 && s.habits.every(h => h.completedToday) },
    { id: 'gem_spender', name: 'Big Spender', icon: 'fa-money-bill-transfer', desc: 'Spend 500+ gems on rewards', check: s => s.claimedRewards.reduce((a, r) => a + (r.gems || 0), 0) >= 500 },
    { id: 'gem_spender_1k', name: 'Lavish', icon: 'fa-money-check-dollar', desc: 'Spend 1000+ gems', check: s => s.claimedRewards.reduce((a, r) => a + (r.gems || 0), 0) >= 1000 },
    { id: 'all_reward_types', name: 'Completionist', icon: 'fa-list-check', desc: 'Claim all 3 default rewards', check: s => s.claimedRewards.length >= 3 },
    { id: 'streak_and_gems', name: 'Dual Power', icon: 'fa-bolt-lightning', desc: '30 streak + 1000 gems', check: s => s.longestStreak >= 30 && s.totalGemsEarned >= 1000 },
    { id: 'triple_threat_badge', name: 'Triple Crown', icon: 'fa-chess-queen', desc: 'Level 10 + 50 streak + 2000 gems', check: s => s.level >= 10 && s.longestStreak >= 50 && s.totalGemsEarned >= 2000 },
    { id: 'ultimate', name: 'Ultimate Hero', icon: 'fa-shield', desc: 'Level 25 + 100 streak + 10000 gems', check: s => s.level >= 25 && s.longestStreak >= 100 && s.totalGemsEarned >= 10000 },
    { id: 'god_mode', name: 'God Mode', icon: 'fa-eye', desc: 'Level 50 + 365 streak + 50000 gems', check: s => s.level >= 50 && s.longestStreak >= 365 && s.totalGemsEarned >= 50000 },
    { id: 'zen_master_2', name: 'Inner Peace', icon: 'fa-yin-yang', desc: '50 perfect days + 50 streak', check: s => Object.values(s.completedDays).filter(v => v === 'completed').length >= 50 && s.longestStreak >= 50 },
    { id: 'explorer', name: 'Feature Explorer', icon: 'fa-compass', desc: 'Use all pages', check: s => s.pagesVisited && s.pagesVisited.length >= 5 },
    { id: 'dark_knight', name: 'Dark Knight', icon: 'fa-mask', desc: 'Enable dark mode + 10 streak', check: s => s.darkMode && s.longestStreak >= 10 },
    { id: 'rainbow', name: 'Rainbow Master', icon: 'fa-rainbow', desc: 'Try all accent colors', check: s => s.accentsUsed && s.accentsUsed.length >= 5 },
];

const QUOTES = [
    { t: "The secret of getting ahead is getting started.", a: "Mark Twain" },
    { t: "It does not matter how slowly you go as long as you do not stop.", a: "Confucius" },
    { t: "Success is the sum of small efforts repeated day in and day out.", a: "Robert Collier" },
    { t: "Motivation is what gets you started. Habit is what keeps you going.", a: "Jim Ryun" },
    { t: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", a: "Aristotle" },
    { t: "Small daily improvements over time lead to stunning results.", a: "Robin Sharma" },
    { t: "You will never change your life until you change something you do daily.", a: "John C. Maxwell" },
    { t: "Discipline is the bridge between goals and accomplishment.", a: "Jim Rohn" },
    { t: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
    { t: "Do not watch the clock; do what it does. Keep going.", a: "Sam Levenson" },
    { t: "A journey of a thousand miles begins with a single step.", a: "Lao Tzu" },
    { t: "Believe you can and you are halfway there.", a: "Theodore Roosevelt" },
    { t: "Your future is created by what you do today, not tomorrow.", a: "Robert Kiyosaki" },
    { t: "Consistency is the true foundation of trust.", a: "Roy T. Bennett" },
    { t: "Habits are the compound interest of self-improvement.", a: "James Clear" },
    { t: "First forget inspiration. Habit is more dependable.", a: "Octavia Butler" },
    { t: "Good habits formed at youth make all the difference.", a: "Aristotle" },
    { t: "Chains of habit are too light to be felt until they are too heavy to be broken.", a: "Warren Buffett" },
    { t: "It is never too late to be what you might have been.", a: "George Eliot" },
    { t: "What you do every day matters more than what you do once in a while.", a: "Gretchen Rubin" },
    { t: "The best time to plant a tree was 20 years ago. The second best time is now.", a: "Chinese Proverb" },
    { t: "Don't count the days, make the days count.", a: "Muhammad Ali" },
    { t: "The difference between ordinary and extraordinary is that little extra.", a: "Jimmy Johnson" },
    { t: "Action is the foundational key to all success.", a: "Pablo Picasso" },
    { t: "Start where you are. Use what you have. Do what you can.", a: "Arthur Ashe" },
    { t: "Success is not final, failure is not fatal: it is the courage to continue that counts.", a: "Winston Churchill" },
    { t: "The only impossible journey is the one you never begin.", a: "Tony Robbins" },
    { t: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", a: "Ralph Waldo Emerson" },
    { t: "You miss 100% of the shots you don't take.", a: "Wayne Gretzky" },
    { t: "Whether you think you can or you think you can't, you're right.", a: "Henry Ford" },
    { t: "The harder you work for something, the greater you'll feel when you achieve it.", a: "Anonymous" },
    { t: "Don't wish it were easier. Wish you were better.", a: "Jim Rohn" },
    { t: "The man who moves a mountain begins by carrying away small stones.", a: "Confucius" },
    { t: "Success usually comes to those who are too busy to be looking for it.", a: "Henry David Thoreau" },
    { t: "Knowing is not enough; we must apply. Willing is not enough; we must do.", a: "Johann Wolfgang von Goethe" },
    { t: "The pain you feel today will be the strength you feel tomorrow.", a: "Arnold Schwarzenegger" },
    { t: "Dream big and dare to fail.", a: "Norman Vaughan" },
    { t: "It always seems impossible until it's done.", a: "Nelson Mandela" },
    { t: "In the middle of every difficulty lies opportunity.", a: "Albert Einstein" },
    { t: "Quality is not an act, it is a habit.", a: "Aristotle" },
    { t: "If you want to achieve greatness stop asking for permission.", a: "Anonymous" },
    { t: "Things do not happen. Things are made to happen.", a: "John F. Kennedy" },
    { t: "Well done is better than well said.", a: "Benjamin Franklin" },
    { t: "What we think, we become.", a: "Buddha" },
    { t: "The way to get started is to quit talking and begin doing.", a: "Walt Disney" },
    { t: "If you are going through hell, keep going.", a: "Winston Churchill" },
    { t: "Strive not to be a success, but rather to be of value.", a: "Albert Einstein" },
    { t: "I find that the harder I work, the more luck I seem to have.", a: "Thomas Jefferson" },
    { t: "Don't be afraid to give up the good to go for the great.", a: "John D. Rockefeller" },
    { t: "Everything you've ever wanted is on the other side of fear.", a: "George Addair" },
    { t: "Success is walking from failure to failure with no loss of enthusiasm.", a: "Winston Churchill" },
    { t: "The mind is everything. What you think you become.", a: "Buddha" },
    { t: "An unexamined life is not worth living.", a: "Socrates" },
    { t: "Eighty percent of success is showing up.", a: "Woody Allen" },
    { t: "Your limitation—it's only your imagination.", a: "Anonymous" },
    { t: "The best revenge is massive success.", a: "Frank Sinatra" },
    { t: "I have not failed. I've just found 10,000 ways that won't work.", a: "Thomas Edison" },
    { t: "A person who never made a mistake never tried anything new.", a: "Albert Einstein" },
    { t: "Too many of us are not living our dreams because we are living our fears.", a: "Les Brown" },
    { t: "Life is what happens when you're busy making other plans.", a: "John Lennon" },
    { t: "If you really look closely, most overnight successes took a long time.", a: "Steve Jobs" },
    { t: "The only person you are destined to become is the person you decide to be.", a: "Ralph Waldo Emerson" },
    { t: "Go confidently in the direction of your dreams. Live the life you have imagined.", a: "Henry David Thoreau" },
    { t: "When I let go of what I am, I become what I might be.", a: "Lao Tzu" },
    { t: "Life is 10% what happens to me and 90% of how I react to it.", a: "Charles Swindoll" },
    { t: "You become what you believe.", a: "Oprah Winfrey" },
    { t: "I would rather die of passion than of boredom.", a: "Vincent van Gogh" },
    { t: "If you hear a voice within you say 'you cannot paint,' then by all means paint and that voice will be silenced.", a: "Vincent van Gogh" },
    { t: "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.", a: "Aristotle" },
    { t: "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.", a: "Jesus Christ" },
    { t: "The only way to discover the limits of the possible is to go beyond them into the impossible.", a: "Arthur C. Clarke" },
    { t: "Logic will get you from A to Z; imagination will get you everywhere.", a: "Albert Einstein" },
    { t: "What you get by achieving your goals is not as important as what you become by achieving your goals.", a: "Zig Ziglar" },
    { t: "Happiness is not something ready-made. It comes from your own actions.", a: "Dalai Lama" },
    { t: "Change your thoughts and you change your world.", a: "Norman Vincent Peale" },
    { t: "If you want to lift yourself up, lift up someone else.", a: "Booker T. Washington" },
    { t: "Whoever is happy will make others happy too.", a: "Anne Frank" },
    { t: "Do what you can, with what you have, where you are.", a: "Theodore Roosevelt" },
    { t: "You are never too old to set another goal or to dream a new dream.", a: "C.S. Lewis" },
    { t: "To handle yourself, use your head; to handle others, use your heart.", a: "Eleanor Roosevelt" },
    { t: "Not how long, but how well you have lived is the main thing.", a: "Seneca" },
    { t: "If I cannot do great things, I can do small things in a great way.", a: "Martin Luther King Jr." },
    { t: "The future belongs to those who believe in the beauty of their dreams.", a: "Eleanor Roosevelt" },
    { t: "It is during our darkest moments that we must focus to see the light.", a: "Aristotle" },
    { t: "The best preparation for tomorrow is doing your best today.", a: "H. Jackson Brown Jr." },
    { t: "Keep your face always toward the sunshine—and shadows will fall behind you.", a: "Walt Whitman" },
    { t: "In order to write about life first you must live it.", a: "Ernest Hemingway" },
    { t: "The purpose of our lives is to be happy.", a: "Dalai Lama" },
    { t: "Life is really simple, but we insist on making it complicated.", a: "Confucius" },
    { t: "May you live all the days of your life.", a: "Jonathan Swift" },
    { t: "Life itself is the most wonderful fairy tale.", a: "Hans Christian Andersen" },
    { t: "Only a life lived for others is a life worthwhile.", a: "Albert Einstein" },
    { t: "The unexamined life is not worth living.", a: "Socrates" },
    { t: "Turn your wounds into wisdom.", a: "Oprah Winfrey" },
    { t: "The way I see it, if you want the rainbow, you gotta put up with the rain.", a: "Dolly Parton" },
    { t: "The greatest glory in living lies not in never falling, but in rising every time we fall.", a: "Nelson Mandela" },
    { t: "In this life we cannot do great things. We can only do small things with great love.", a: "Mother Teresa" },
    { t: "Live in the sunshine, swim the sea, drink the wild air.", a: "Ralph Waldo Emerson" },
    { t: "What we achieve inwardly will change outer reality.", a: "Plutarch" },
    { t: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", a: "Mother Teresa" }
];

// ===== STATE MANAGEMENT =====
function getDefault() {
    return {
        habits: [], rewards: [
            { id: 1, name: "7-Day Streak", icon: "fa-trophy", gems: 100, description: "Maintain a 7-day streak on any habit", claimed: false, check: function (s) { return s.longestStreak >= 7; } },
            { id: 2, name: "Monthly Master", icon: "fa-medal", gems: 500, description: "Complete all habits for 30 days", claimed: false, check: function (s) { return Object.values(s.completedDays).filter(function (v) { return v === 'completed'; }).length >= 30; } },
            { id: 3, name: "Habit Hero", icon: "fa-star", gems: 1000, description: "Reach level 10", claimed: false, check: function (s) { return s.level >= 10; } }
        ], claimedRewards: [], gems: 50, xp: 0, level: 1, currentStreak: 0, longestStreak: 0,
        completedToday: false, totalHabitsCompleted: 0, totalGemsEarned: 50, habitsCreated: 0,
        freezesUsed: 0, comebacks: 0, streakFreezes: 3, today: null,
        currentMonth: new Date().getMonth(), currentYear: new Date().getFullYear(),
        completedDays: {}, graphs: [], activeFilters: {}, unlockedAchievements: [],
        darkMode: false, lastCompletedDate: null, accentColor: 'green',
        dataExported: 0, dataImported: 0, habitsEdited: 0, habitsDeleted: 0,
        graphsCreated: 0, pagesVisited: [], accentsUsed: ['green'], gemChestsToday: 0
    };
}
var appState = getDefault();

function saveState() { var s = Object.assign({}, appState); s.today = null; localStorage.setItem('habitHeroState', JSON.stringify(s)); }

function loadState() {
    var s = localStorage.getItem('habitHeroState');
    if (s) { Object.assign(appState, JSON.parse(s)); }
    appState.today = new Date();
    if (!appState.accentColor) appState.accentColor = 'green';
    if (!appState.dataExported) appState.dataExported = 0;
    if (!appState.dataImported) appState.dataImported = 0;
    if (!appState.habitsEdited) appState.habitsEdited = 0;
    if (!appState.habitsDeleted) appState.habitsDeleted = 0;
    if (!appState.graphsCreated) appState.graphsCreated = 0;
    if (!appState.pagesVisited) appState.pagesVisited = [];
    if (!appState.accentsUsed) appState.accentsUsed = ['green'];
    // Re-attach check functions to default rewards (functions don't survive JSON serialization)
    var defaultChecks = {
        1: function (s) { return s.longestStreak >= 7; },
        2: function (s) { return Object.values(s.completedDays).filter(function (v) { return v === 'completed'; }).length >= 30; },
        3: function (s) { return s.level >= 10; }
    };
    appState.rewards.forEach(function (r) {
        if (defaultChecks[r.id]) r.check = defaultChecks[r.id];
    });
}

function showToast(msg, type) {
    type = type || 'success';
    var c = document.getElementById('toast-container');
    var t = document.createElement('div');
    t.className = 'toast toast-' + type;
    var icons = { success: 'fa-check-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle', levelup: 'fa-arrow-up', error: 'fa-times-circle' };
    t.innerHTML = '<i class="fas ' + (icons[type] || icons.success) + ' mr-2"></i>' + msg;
    c.appendChild(t);
    setTimeout(function () { t.remove(); }, 3500);
}

function xpForLevel(l) { return l * l * 100; }

function addXP(amt) {
    if (appState.doubleXP && appState.doubleXPExpiry && new Date() < new Date(appState.doubleXPExpiry)) {
        amt *= 2;
    }
    appState.xp += amt;
    while (appState.xp >= xpForLevel(appState.level)) {
        appState.xp -= xpForLevel(appState.level);
        appState.level++;
        showToast('Level Up! You reached Level ' + appState.level + '!', 'levelup');
        playCelebration();
        checkAchievements();
    }
    updateXPDisplay();
    saveState();
}

function updateXPDisplay() {
    var n = xpForLevel(appState.level);
    var p = Math.min((appState.xp / n) * 100, 100);
    var l = document.getElementById('header-level');
    var b = document.getElementById('header-xp-bar');
    if (l) l.textContent = 'Lv ' + appState.level;
    if (b) b.style.width = p + '%';
}

function setDarkMode(on) { appState.darkMode = on; document.documentElement.classList.toggle('dark', on); saveState(); }

function setDailyQuote() {
    var d = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    var q = QUOTES[d % QUOTES.length];
    var el = document.getElementById('daily-quote');
    var au = document.getElementById('quote-author');
    if (el) el.textContent = '"' + q.t + '"';
    if (au) au.textContent = '- ' + q.a;
}

function getAchievementGemValue(id) {
    // Legendary / Special achievements
    var legendary = ['ultimate', 'god_mode', 'zen_master_2', 'triple_threat_badge', 'year_long', 'two_years', 'ten_thousand', 'mega_completions', 'level_100', 'level_200', 'gem_100k', 'gem_infinite'];
    if (legendary.indexOf(id) !== -1) return 250;
    // Hard achievements
    var hard = ['century_club', 'half_year', 'thousand_strong', 'fifteen_hundred', 'two_thousand', 'three_thousand', 'five_thousand', 'seven_five_hundred', 'gem_lord', 'gem_15k', 'gem_20k', 'gem_50k', 'level_50', 'level_75', 'perfect_100', 'perfect_200', 'streak_and_gems', 'dark_knight', 'all_streak_10', 'single_100', 'single_365', 'complete_200_day', 'gem_spender_1k'];
    if (hard.indexOf(id) !== -1) return 100;
    // Medium achievements
    var medium = ['monthly_master', 'forty_five', 'sixty_days', 'ninety_days', 'centurion', 'one_fifty', 'two_hundred', 'three_hundred', 'five_hundred', 'seven_fifty', 'diamond_hands', 'gem_2k', 'gem_3k', 'treasure_hoard', 'gem_7500', 'level_15', 'level_20', 'level_25', 'level_30', 'level_40', 'reward_10', 'reward_15', 'reward_20', 'reward_30', 'perfect_30', 'perfect_50', 'perfect_75', 'freeze_10', 'comeback_10', 'comeback_20', 'single_50', 'consistent_1k', 'mega_streak_sum', 'gem_spender', 'all_reward_types', 'veteran_user', 'old_timer', 'reader_50', 'coder_30', 'early_riser_30', 'yoga_master'];
    if (medium.indexOf(id) !== -1) return 50;
    // Easy (default)
    return 25;
}

function checkAchievements() {
    var n = 0;
    ACHIEVEMENTS.forEach(function (a) {
        if (appState.unlockedAchievements.indexOf(a.id) === -1) {
            try {
                if (a.check(appState)) {
                    appState.unlockedAchievements.push(a.id);
                    showToast('Achievement Unlocked: ' + a.name + '!', 'warning');
                    // Generate a claimable reward for this achievement
                    var alreadyExists = appState.rewards.some(function (r) { return r.achievementId === a.id; });
                    if (!alreadyExists) {
                        appState.rewards.push({
                            id: Date.now() + Math.floor(Math.random() * 10000),
                            achievementId: a.id,
                            name: a.name,
                            icon: a.icon,
                            gems: getAchievementGemValue(a.id),
                            description: 'Achievement: ' + a.desc,
                            claimed: false
                        });
                    }
                    n++;
                }
            } catch (e) { /* skip achievements that error */ }
        }
    });
    if (n > 0) { renderAchievements(); renderRewards(); saveState(); }
}

function renderAchievements() {
    var c = document.getElementById('achievements-container');
    if (!c) return;
    c.innerHTML = '';
    ACHIEVEMENTS.forEach(function (a) {
        var u = appState.unlockedAchievements.indexOf(a.id) !== -1;
        var d = document.createElement('div');
        d.className = 'achievement-item rounded-xl p-2 flex flex-col items-center text-center cursor-pointer ' + (u ? 'unlocked' : 'locked');
        d.title = a.name + ': ' + a.desc;
        d.innerHTML = '<div class="w-10 h-10 rounded-full flex items-center justify-center mb-1 ' + (u ? 'bg-yellow-200' : 'bg-gray-100 dark:bg-slate-700') + '"><i class="fas ' + (u ? a.icon : 'fa-lock') + ' ' + (u ? 'text-yellow-600' : 'text-gray-400 dark:text-gray-500') + '"></i></div><span class="text-xs font-medium ' + (u ? '' : 'text-gray-400 dark:text-gray-500') + '">' + a.name + '</span>';
        c.appendChild(d);
    });
    var ct = document.getElementById('achievement-count');
    if (ct) ct.textContent = '(' + appState.unlockedAchievements.length + '/' + ACHIEVEMENTS.length + ')';
}

function createHabit(name, icon, color, gems, description, targetDays) {
    return { id: Date.now() + Math.floor(Math.random() * 1000), name: name, icon: icon, color: color, streak: 0, completedToday: false, gems: gems, description: description, monthlyCompletions: {}, notes: [], targetDays: targetDays || ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] };
}

function updateGemDisplay() {
    document.getElementById('gem-count').textContent = appState.gems;
    document.getElementById('profile-gem-count').textContent = appState.gems + ' Gems';
}

function updateStats() {
    document.getElementById('current-streak-display').textContent = appState.currentStreak;
    document.getElementById('current-streak').textContent = appState.currentStreak + ' days';
    document.getElementById('longest-streak').textContent = appState.longestStreak + ' days';
    document.getElementById('progress-current-streak').textContent = appState.currentStreak;
    document.getElementById('progress-longest-streak').textContent = appState.longestStreak;
    document.getElementById('total-habits').textContent = appState.habits.length;
    document.getElementById('habits-completed').textContent = appState.totalHabitsCompleted;
    var dim = new Date(appState.currentYear, appState.currentMonth + 1, 0).getDate();
    var dp = Math.min(appState.today.getDate(), dim);
    var cd = Object.values(appState.completedDays).filter(function (s) { return s === 'completed' || s === 'partial'; }).length;
    var cr = dp > 0 ? Math.round((cd / dp) * 100) : 0;
    document.getElementById('completion-rate').textContent = cr + '%';
    // Update streak ring SVG
    var ring = document.querySelector('.progress-ring-circle');
    if (ring) {
        var circumference = 188.4;
        var goal = 30;
        var pct = Math.min(appState.currentStreak / goal, 1);
        ring.setAttribute('stroke-dashoffset', circumference * (1 - pct));
    }
    // Update streak freeze text
    var freezeText = document.getElementById('streak-freeze-text');
    if (freezeText) freezeText.textContent = appState.streakFreezes + ' day streak freeze available';
}

function renderHabits(filter) {
    var c = document.getElementById('habits-container');
    c.innerHTML = '';
    var habitsToShow = appState.habits;
    if (filter) {
        var f = filter.toLowerCase();
        habitsToShow = habitsToShow.filter(function (h) { return h.name.toLowerCase().indexOf(f) !== -1; });
    }
    habitsToShow.forEach(function (h) {
        var d = document.createElement('div');
        d.className = 'habit-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300';
        d.innerHTML = '<div class="p-5"><div class="flex justify-between items-start mb-3"><div class="w-12 h-12 bg-' + h.color + '-100 rounded-lg flex items-center justify-center"><i class="fas ' + h.icon + ' text-' + h.color + '-500 text-xl"></i></div><div class="flex items-center space-x-2"><span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Daily</span><div class="kebab-menu"><button class="kebab-toggle text-gray-400 hover:text-gray-600 p-1"><i class="fas fa-ellipsis-vertical"></i></button><div class="kebab-dropdown"><a href="#" class="edit-habit-btn" data-habit-id="' + h.id + '"><i class="fas fa-pen mr-2"></i>Edit</a><a href="#" class="notes-habit-btn" data-habit-id="' + h.id + '"><i class="fas fa-sticky-note mr-2"></i>Notes</a><a href="#" class="delete-habit-btn text-red-500" data-habit-id="' + h.id + '"><i class="fas fa-trash mr-2"></i>Delete</a></div></div></div></div><h3 class="text-lg font-bold mb-1">' + h.name + '</h3><p class="text-gray-600 text-sm mb-3">' + h.description + '</p><div class="flex items-center justify-between"><div class="flex items-center"><i class="fas fa-gem text-blue-500 mr-1"></i><span class="text-sm font-medium">+' + h.gems + ' Gems</span></div><div class="flex items-center"><i class="fas fa-fire text-orange-500 mr-1"></i><span class="text-sm font-medium">' + h.streak + ' day streak</span></div></div></div><div class="bg-gray-50 px-5 py-3 flex justify-between items-center border-t border-gray-100"><div class="text-sm text-gray-500">Mark as completed</div><button class="streak-btn px-4 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium ' + (h.completedToday ? 'completed' : '') + '" data-habit-id="' + h.id + '">' + (h.completedToday ? 'Completed!' : 'Complete') + '</button></div>';
        c.appendChild(d);
    });
    updateDailyGoalProgress();
    renderWeeklySummary();
}

function renderRewards() {
    var rc = document.getElementById('rewards-container');
    rc.innerHTML = '';
    var rcc = document.getElementById('rewards-center-container');
    rcc.innerHTML = '';
    var crc = document.getElementById('claimed-rewards-container');
    crc.innerHTML = '';
    appState.rewards.forEach(function (r) {
        if (r.claimed) return;
        // Only show reward if its unlock condition is met (or it has no condition)
        try { if (r.check && !r.check(appState)) return; } catch (e) { return; }
        var mk = function (cls) {
            var d = document.createElement('div');
            d.className = cls;
            d.innerHTML = '<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"><i class="fas ' + r.icon + ' text-blue-500 text-2xl"></i></div><h3 class="font-bold mb-2">' + r.name + '</h3><p class="text-gray-600 text-sm mb-4">' + r.description + '</p><div class="mt-auto"><div class="flex items-center justify-center"><i class="fas fa-gem text-blue-500 mr-1"></i><span class="font-medium">' + r.gems + ' Gems</span></div><button class="claim-reward-btn mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium" data-reward-id="' + r.id + '">Claim Reward</button></div>';
            return d;
        };
        rc.appendChild(mk('bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center'));
        rcc.appendChild(mk('reward-card bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center'));
    });
    appState.claimedRewards.forEach(function (r) {
        var d = document.createElement('div');
        d.className = 'bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center';
        d.innerHTML = '<div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4"><i class="fas ' + r.icon + ' text-yellow-500 text-xl"></i></div><div><h4 class="font-bold">' + r.name + '</h4><p class="text-sm text-yellow-700">' + r.description + '</p></div>';
        crc.appendChild(d);
    });
    renderShop();
}

function renderShop() {
    document.getElementById('shop-gem-count').textContent = appState.gems;
    document.getElementById('shop-freeze-count').textContent = appState.streakFreezes || 0;
    document.getElementById('inv-freeze-count').textContent = appState.streakFreezes || 0;

    var dxpStatus = document.getElementById('shop-double-xp-status');
    var invDxpStatus = document.getElementById('inv-double-xp-status');

    if (appState.doubleXP && appState.doubleXPExpiry && new Date() < new Date(appState.doubleXPExpiry)) {
        var expiry = new Date(appState.doubleXPExpiry);
        var timeLeft = Math.ceil((expiry - new Date()) / (1000 * 60 * 60));
        var msg = 'Active (' + timeLeft + 'h left)';
        if (dxpStatus) { dxpStatus.textContent = msg; dxpStatus.className = 'text-sm text-green-600 font-bold mb-4'; }
        if (invDxpStatus) { invDxpStatus.textContent = 'Double XP: ' + msg; invDxpStatus.className = 'text-sm font-bold text-green-600'; }
    } else {
        if (dxpStatus) { dxpStatus.textContent = 'Ready to activate'; dxpStatus.className = 'text-sm text-purple-600 font-medium mb-4'; }
        if (invDxpStatus) { invDxpStatus.textContent = 'Double XP: Inactive'; invDxpStatus.className = 'text-sm font-medium'; }
        appState.doubleXP = false;
    }

    // Bind buy buttons
    // Bind buy buttons
    var btnFreeze = document.getElementById('btn-streak-freeze');
    if (btnFreeze) {
        if ((appState.streakFreezes || 0) >= 3) {
            btnFreeze.disabled = true;
            btnFreeze.innerHTML = 'Max Reached';
            btnFreeze.className = 'w-full py-2.5 rounded-lg font-bold text-gray-400 bg-gray-200 cursor-not-allowed flex items-center justify-center';
        } else {
            btnFreeze.disabled = false;
            btnFreeze.onclick = function () { buyShopItem('streak_freeze'); };
        }
    }

    var btnGemChest = document.getElementById('btn-gem-chest');
    if (btnGemChest) {
        if ((appState.gemChestsToday || 0) >= 3) {
            btnGemChest.disabled = true;
            btnGemChest.innerHTML = 'Limit Reached';
            btnGemChest.className = 'w-full py-2.5 rounded-lg font-bold text-gray-400 bg-gray-200 cursor-not-allowed flex items-center justify-center';
        } else {
            btnGemChest.disabled = false;
            btnGemChest.onclick = function () { buyShopItem('gem_chest'); };
        }
    }

    var btnDoubleXP = document.getElementById('btn-double-xp');
    if (btnDoubleXP) {
        btnDoubleXP.onclick = function () { buyShopItem('double_xp'); };
    }

    document.querySelectorAll('.shop-buy-btn:not([id])').forEach(function (btn) {
        btn.onclick = function () { buyShopItem(this.getAttribute('data-item')); };
    });
}

function buyShopItem(item) {
    if (item === 'streak_freeze') {
        if ((appState.streakFreezes || 0) >= 3) { showToast('Max streak freezes reached!', 'warning'); return; }
        if (appState.gems >= 50) {
            appState.gems -= 50;
            appState.streakFreezes = (appState.streakFreezes || 0) + 1;
            showToast('Streak Freeze purchased!', 'success');
            playCelebration();
        } else { showToast('Not enough gems!', 'error'); }
    } else if (item === 'double_xp') {
        if (appState.gems >= 100) {
            if (appState.doubleXP) { showToast('Double XP already active!', 'warning'); return; }
            appState.gems -= 100;
            appState.doubleXP = true;
            var d = new Date(); d.setHours(d.getHours() + 24);
            appState.doubleXPExpiry = d.toISOString();
            showToast('Double XP activated for 24h!', 'success');
            playCelebration();
        } else { showToast('Not enough gems!', 'error'); }
    } else if (item === 'gem_chest') {
        if ((appState.gemChestsToday || 0) >= 3) { showToast('Daily limit reached!', 'warning'); return; }
        if (appState.gems >= 200) {
            appState.gems -= 200;
            var win = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
            appState.gems += win;
            appState.gemChestsToday = (appState.gemChestsToday || 0) + 1;
            appState.totalGemsEarned += win;
            showToast('You won ' + win + ' Gems!', 'success');
            playCelebration();
        } else { showToast('Not enough gems!', 'error'); }
    }
    updateGemDisplay(); renderShop(); saveState();
}

function renderProfileHabits() {
    var c = document.getElementById('profile-habits-container');
    c.innerHTML = '';
    appState.habits.forEach(function (h) {
        var d = document.createElement('div');
        d.className = 'flex items-center justify-between p-3 border-b border-gray-100';
        d.innerHTML = '<div class="flex items-center"><div class="w-10 h-10 bg-' + h.color + '-100 rounded-lg flex items-center justify-center mr-3"><i class="fas ' + h.icon + ' text-' + h.color + '-500"></i></div><span class="font-medium">' + h.name + '</span></div><span class="text-sm text-gray-600">' + h.streak + ' day streak</span>';
        c.appendChild(d);
    });
    updateStats();
}

function renderHabitPerformance() {
    var c = document.getElementById('habit-performance-container');
    c.innerHTML = '';
    var dim = new Date(appState.currentYear, appState.currentMonth + 1, 0).getDate();
    var dp = Math.min(appState.today.getDate(), dim);
    appState.habits.forEach(function (h) {
        var k = appState.currentYear + '-' + appState.currentMonth;
        var cd = h.monthlyCompletions[k] || 0;
        var p = dp > 0 ? Math.round((cd / dp) * 100) : 0;
        var d = document.createElement('div');
        d.className = 'mb-4 last:mb-0';
        d.innerHTML = '<div class="flex justify-between mb-2"><span class="font-medium">' + h.name + '</span><span class="font-bold text-blue-600">' + p + '%</span></div><div class="progress-bar"><div class="progress-fill" style="width:' + p + '%"></div></div>';
        c.appendChild(d);
    });
}

function updateDailyGoalProgress() {
    var cc = appState.habits.filter(function (h) { return h.completedToday; }).length;
    var tc = appState.habits.length;
    var pct = tc > 0 ? (cc / tc) * 100 : 0;
    var bar = document.getElementById('daily-goal-progress');
    var txt = document.getElementById('daily-goal-text');
    var btn = document.getElementById('complete-all-btn');
    bar.style.width = pct + '%';
    txt.textContent = cc + '/' + tc + ' completed';
    if (cc === tc && tc > 0) {
        bar.classList.remove('bg-accent'); bar.classList.add('bg-blue-500');
        btn.textContent = appState.completedToday ? 'Reward Claimed Today' : 'Claim Reward!';
        if (appState.completedToday) { btn.classList.add('bg-gray-400', 'cursor-not-allowed'); btn.classList.remove('bg-accent', 'hover:bg-accent-dark'); }
        else { btn.classList.remove('bg-gray-400', 'cursor-not-allowed'); btn.classList.add('bg-accent', 'hover:bg-accent-dark'); }
    } else {
        bar.classList.remove('bg-blue-500'); bar.classList.add('bg-accent');
        btn.textContent = 'Complete All Goals';
        btn.classList.remove('bg-gray-400', 'cursor-not-allowed'); btn.classList.add('bg-accent', 'hover:bg-accent-dark');
    }
}

function renderCalendar() {
    var mn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById('current-month').textContent = mn[appState.currentMonth] + ' ' + appState.currentYear;
    var ys = document.getElementById('year-select');
    ys.innerHTML = '';
    for (var y = 2020; y <= 2030; y++) {
        var o = document.createElement('option');
        o.value = y; o.textContent = y;
        if (y === appState.currentYear) o.selected = true;
        ys.appendChild(o);
    }
    var fd = new Date(appState.currentYear, appState.currentMonth, 1).getDay();
    var dim = new Date(appState.currentYear, appState.currentMonth + 1, 0).getDate();
    var html = '';
    for (var i = 0; i < fd; i++) html += '<div class="h-12 rounded-lg"></div>';
    for (var d = 1; d <= dim; d++) {
        var dk = appState.currentYear + '-' + appState.currentMonth + '-' + d;
        var st = appState.completedDays[dk] || 'empty';
        var isToday = appState.today.getMonth() === appState.currentMonth && appState.today.getFullYear() === appState.currentYear && d === appState.today.getDate();
        html += '<div class="h-12 rounded-lg flex items-center justify-center calendar-day ' + st + ' ' + (isToday ? 'today-highlight' : '') + '">' + d + '</div>';
    }
    document.getElementById('calendar-days').innerHTML = html;
}

// ===== REAL DATA CHART FUNCTIONS =====

function getRealChartData(timeRange, dataType) {
    var labels = [];
    var data = [];
    var today = new Date();

    if (timeRange === 'Last 7 Days' || timeRange === 'last7') {
        var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (var i = 6; i >= 0; i--) {
            var d = new Date(today);
            d.setDate(d.getDate() - i);
            labels.push(dayNames[d.getDay()]);
            var dk = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
            var status = appState.completedDays[dk];
            if (dataType === 'Completion Rate' || dataType === 'Completion Percentage') {
                if (status === 'completed') data.push(100);
                else if (status === 'partial') data.push(50);
                else data.push(0);
            } else if (dataType === 'Habits Done') {
                var count = 0;
                appState.habits.forEach(function (h) {
                    var mk = d.getFullYear() + '-' + d.getMonth();
                    if (h.monthlyCompletions[mk]) count++;
                });
                data.push(status ? (status === 'completed' ? appState.habits.length : Math.ceil(appState.habits.length / 2)) : 0);
            } else {
                if (status === 'completed') data.push(100);
                else if (status === 'partial') data.push(50);
                else data.push(0);
            }
        }
    } else if (timeRange === 'Current Month' || timeRange === 'month') {
        var dim = new Date(appState.currentYear, appState.currentMonth + 1, 0).getDate();
        var maxDay = Math.min(today.getDate(), dim);
        for (var j = 1; j <= maxDay; j++) {
            labels.push(j.toString());
            var dk2 = appState.currentYear + '-' + appState.currentMonth + '-' + j;
            var st = appState.completedDays[dk2];
            if (st === 'completed') data.push(100);
            else if (st === 'partial') data.push(50);
            else data.push(0);
        }
    } else if (timeRange === 'Last 4 Weeks' || timeRange === 'weeks') {
        for (var w = 3; w >= 0; w--) {
            labels.push('Week ' + (4 - w));
            var weekTotal = 0;
            var weekDays = 0;
            for (var wd = 0; wd < 7; wd++) {
                var dd = new Date(today);
                dd.setDate(dd.getDate() - (w * 7 + wd));
                var dk3 = dd.getFullYear() + '-' + dd.getMonth() + '-' + dd.getDate();
                weekDays++;
                if (appState.completedDays[dk3] === 'completed') weekTotal += 100;
                else if (appState.completedDays[dk3] === 'partial') weekTotal += 50;
            }
            data.push(weekDays > 0 ? Math.round(weekTotal / weekDays) : 0);
        }
    } else {
        // Default: last 7 days
        return getRealChartData('Last 7 Days', dataType);
    }
    return { labels: labels, data: data };
}

var mainProgressChart = null;
function initProgressChart() {
    var ctx = document.getElementById('progress-chart').getContext('2d');
    var realData = getRealChartData('Last 4 Weeks', 'Completion Rate');
    if (mainProgressChart) mainProgressChart.destroy();
    mainProgressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: realData.labels,
            datasets: [{
                label: 'Habit Completion Rate',
                data: realData.data,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2, tension: 0.3, fill: true
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 100, ticks: { callback: function (v) { return v + '%'; } } } }
        }
    });
}

var graphCharts = {};
function addGraph(type, title, timeRange, dataType, preset) {
    appState.graphs.push({ id: Date.now() + Math.random(), type: type, title: title, timeRange: timeRange, dataType: dataType, preset: preset });
    appState.graphsCreated = (appState.graphsCreated || 0) + 1;
    renderAdditionalGraphs();
}

function renderAdditionalGraphs() {
    var c = document.getElementById('additional-graphs');
    c.innerHTML = '';
    // Destroy old chart instances
    Object.keys(graphCharts).forEach(function (k) { if (graphCharts[k]) graphCharts[k].destroy(); });
    graphCharts = {};
    appState.graphs.forEach(function (g) {
        var d = document.createElement('div');
        d.className = 'graph-card bg-white rounded-xl shadow-md p-6';
        d.innerHTML = '<h3 class="text-lg font-bold mb-4">' + g.title + '</h3><div class="chart-container"><canvas id="graph-' + g.id + '"></canvas></div><div class="mt-4 flex justify-between"><span class="text-sm text-gray-600">' + g.timeRange + ' - ' + g.dataType + '</span><button class="delete-graph text-red-500 hover:text-red-700" data-graph-id="' + g.id + '"><i class="fas fa-trash pointer-events-none"></i></button></div>';
        c.appendChild(d);
        setTimeout(function () { initGraphChart(g); }, 100);
    });
}

function initGraphChart(g) {
    var el = document.getElementById('graph-' + g.id);
    if (!el) return;
    var ctx = el.getContext('2d');

    // Get real data
    var tr = g.timeRange;
    if (appState.activeFilters && appState.activeFilters.timeRange) {
        // Map filter keys to readable ranges if needed, or update getRealChartData to handle keys
        var map = { 'week': 'Last 7 Days', 'month': 'Current Month', 'quarter': 'Last 90 Days', 'year': 'All Time' };
        if (map[appState.activeFilters.timeRange]) tr = map[appState.activeFilters.timeRange];
    }
    var realData = getRealChartData(tr, g.dataType);

    // Apply preset colors
    var preset = PRESET_COLORS[g.preset] || PRESET_COLORS['blue-purple'];
    var bgColor = preset.bg;
    var borderColor = preset.border;

    // Use the actual chart type from the graph config
    var chartType = g.type || 'line';

    var datasetConfig = {
        label: g.dataType || 'Completion Rate',
        data: realData.data,
        backgroundColor: chartType === 'line' ? bgColor : realData.data.map(function (_, i) {
            var colors = [preset.bg, preset.bg2 || preset.bg];
            return colors[i % 2];
        }),
        borderColor: chartType === 'line' ? borderColor : realData.data.map(function (_, i) {
            var colors = [preset.border, preset.border2 || preset.border];
            return colors[i % 2];
        }),
        borderWidth: 2,
        tension: 0.3,
        fill: chartType === 'line'
    };

    var options = {
        responsive: true, maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, max: 100, ticks: { callback: function (v) { return v + '%'; } } } }
    };

    // For pie/doughnut/radar, remove scales
    if (chartType === 'pie' || chartType === 'doughnut' || chartType === 'radar') {
        delete options.scales;
        // For pie charts, use habit names as labels if available
        if (appState.habits.length > 0) {
            realData.labels = appState.habits.map(function (h) { return h.name; });
            var mk = appState.currentYear + '-' + appState.currentMonth;
            datasetConfig.data = appState.habits.map(function (h) { return h.monthlyCompletions[mk] || 0; });
            datasetConfig.backgroundColor = appState.habits.map(function (_, i) {
                var hue = (i * 360 / appState.habits.length);
                return 'hsla(' + hue + ', 70%, 60%, 0.7)';
            });
            datasetConfig.borderColor = appState.habits.map(function (_, i) {
                var hue = (i * 360 / appState.habits.length);
                return 'hsl(' + hue + ', 70%, 50%)';
            });
        }
    }

    if (graphCharts[g.id]) graphCharts[g.id].destroy();
    graphCharts[g.id] = new Chart(ctx, {
        type: chartType,
        data: { labels: realData.labels, datasets: [datasetConfig] },
        options: options
    });
}

// ===== HABIT ACTIONS =====
function completeHabit(habitId) {
    var h = null;
    for (var i = 0; i < appState.habits.length; i++) { if (appState.habits[i].id === habitId) { h = appState.habits[i]; break; } }
    if (!h || h.completedToday) return;
    h.completedToday = true; h.streak++; appState.gems += h.gems; appState.totalHabitsCompleted++; appState.totalGemsEarned += h.gems;
    var mk = appState.currentYear + '-' + appState.currentMonth;
    h.monthlyCompletions[mk] = (h.monthlyCompletions[mk] || 0) + 1;
    var tk = appState.today.getFullYear() + '-' + appState.today.getMonth() + '-' + appState.today.getDate();
    var allDone = appState.habits.every(function (x) { return x.completedToday; });
    if (allDone) {
        appState.completedDays[tk] = 'completed';
        if (appState.currentStreak === 0 && appState.longestStreak > 0) appState.comebacks++;
        appState.currentStreak++;
        appState.longestStreak = Math.max(appState.longestStreak, appState.currentStreak);
        appState.completedToday = true;
        appState.lastCompletedDate = new Date().toDateString();
    } else { appState.completedDays[tk] = 'partial'; }
    addXP(h.gems);
    showToast(h.name + ' completed! +' + h.gems + ' Gems', 'success');
    renderHabits(); updateGemDisplay(); renderHabitPerformance(); renderCalendar(); updateStats(); checkAchievements(); saveState();
    if (allDone) {
        document.getElementById('celebration-modal').classList.remove('hidden');
        document.getElementById('celebration-message').textContent = 'You have completed all habits for ' + appState.currentStreak + ' days in a row!';
        document.getElementById('reward-amount').textContent = '+' + appState.habits.reduce(function (s, x) { return s + x.gems; }, 0) + ' Gems';
        playCelebration();
    }
}

function completeAllHabits() {
    if (appState.completedToday || appState.habits.length === 0) return;
    appState.habits.forEach(function (h) {
        if (!h.completedToday) {
            h.completedToday = true; h.streak++; appState.gems += h.gems; appState.totalHabitsCompleted++; appState.totalGemsEarned += h.gems;
            var mk = appState.currentYear + '-' + appState.currentMonth;
            h.monthlyCompletions[mk] = (h.monthlyCompletions[mk] || 0) + 1;
            addXP(h.gems);
        }
    });
    if (appState.currentStreak === 0 && appState.longestStreak > 0) appState.comebacks++;
    appState.currentStreak++;
    appState.longestStreak = Math.max(appState.longestStreak, appState.currentStreak);
    appState.completedToday = true;
    appState.lastCompletedDate = new Date().toDateString();
    var tk = appState.today.getFullYear() + '-' + appState.today.getMonth() + '-' + appState.today.getDate();
    appState.completedDays[tk] = 'completed';
    renderHabits(); updateGemDisplay(); renderHabitPerformance(); renderCalendar(); updateStats(); checkAchievements(); saveState();
    document.getElementById('celebration-modal').classList.remove('hidden');
    document.getElementById('celebration-message').textContent = 'You have completed all habits for ' + appState.currentStreak + ' days in a row!';
    document.getElementById('reward-amount').textContent = '+' + appState.habits.reduce(function (s, h) { return s + h.gems; }, 0) + ' Gems';
    playCelebration();
}

function claimReward(rid) {
    var r = null;
    for (var i = 0; i < appState.rewards.length; i++) { if (appState.rewards[i].id === rid) { r = appState.rewards[i]; break; } }
    if (!r || r.claimed) return;
    r.claimed = true; appState.gems += r.gems; appState.totalGemsEarned += r.gems;
    appState.claimedRewards.push(r);
    showToast('Claimed ' + r.name + '! +' + r.gems + ' Gems', 'info');
    renderRewards(); updateGemDisplay(); checkAchievements(); saveState(); playCelebration();
}

function deleteHabit(hid) {
    appState.habits = appState.habits.filter(function (h) { return h.id !== hid; });
    appState.habitsDeleted = (appState.habitsDeleted || 0) + 1;
    showToast('Habit deleted', 'error');
    renderHabits(); renderProfileHabits(); renderHabitPerformance(); updateStats(); checkAchievements(); saveState();
}

function editHabit(hid) {
    var h = null;
    for (var i = 0; i < appState.habits.length; i++) { if (appState.habits[i].id === hid) { h = appState.habits[i]; break; } }
    if (!h) return;
    var n = prompt('Edit habit name:', h.name);
    if (n && n.trim()) {
        h.name = n.trim();
        appState.habitsEdited = (appState.habitsEdited || 0) + 1;
        showToast('Habit updated', 'info');
        renderHabits(); renderProfileHabits(); renderHabitPerformance(); checkAchievements(); saveState();
    }
}

// --- PHYSICS ENGINE ---
// --- CANVAS PHYSICS ENGINE ---
var activeParticles = [];
var animationFrameId = null;
var lastTime = 0;
var canvas = null;
var ctx = null;
var emojiCache = {};

function getEmojiCache(char, size) {
    const key = `${char}-${size}`;
    if (emojiCache[key]) return emojiCache[key];

    const c = document.createElement('canvas');
    c.width = size * 2; // High DPI / Padding
    c.height = size * 2;
    const cx = c.getContext('2d');
    cx.font = `${size}px sans-serif`;
    cx.textAlign = 'center';
    cx.textBaseline = 'middle';
    cx.fillText(char, size, size); // Center in 2x canvas

    emojiCache[key] = c;
    return c;
}

function initCanvas() {
    canvas = document.getElementById('celebration-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
}

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

class Particle {
    constructor(x, y, color, size, type = 'square') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.type = type; // 'square', 'circle', 'text'

        // Physics
        this.vx = 0;
        this.vy = 0;
        this.gravity = 0.5;
        this.drag = 0.96;

        // Life
        this.life = 100;
        this.maxLife = 100;
        this.decay = 1;

        // Transforms
        this.rotation = 0;
        this.vr = 0;
        this.scale = 1;
        this.vs = 0;
    }

    update(dt) {
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.vy += this.gravity;

        this.x += this.vx;
        this.y += this.vy;

        this.rotation += this.vr;
        this.scale += this.vs;

        this.life -= this.decay;

        return this.life > 0;
    }

    draw(ctx) {
        const opacity = Math.max(0, this.life / this.maxLife);
        ctx.globalAlpha = opacity;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.scale(Math.max(0, this.scale), Math.max(0, this.scale));

        if (this.type === 'text') {
            const cache = getEmojiCache(this.color, this.size);
            // Draw centered. Cache is 2*size width.
            // We want it to fill 'size' dimension on screen (before scaling).
            // So draw width/height = size*2 (to match source resolution?)
            // If we draw it size*2, it appears 2x bigger?
            // The cache has width=2*size.
            // If we drawImage(cache, -size, -size, size*2, size*2), it draws the full 2x image.
            // Since we use scale for animation, the base size should be consistent.
            // Let's rely on visuals.
            ctx.drawImage(cache, -this.size, -this.size, this.size * 2, this.size * 2);
        } else if (this.type === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }

        ctx.restore();
    }
}

function physicsLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    var dt = (timestamp - lastTime) / 16.67;
    lastTime = timestamp;

    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = activeParticles.length - 1; i >= 0; i--) {
            var p = activeParticles[i];
            if (p.update(dt)) {
                p.draw(ctx);
            } else {
                activeParticles.splice(i, 1);
            }
        }
    }

    if (activeParticles.length > 0) {
        animationFrameId = requestAnimationFrame(physicsLoop);
    } else {
        animationFrameId = null;
        lastTime = 0;
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function spawnParticle(p) {
    if (!ctx) initCanvas();
    activeParticles.push(p);
    if (!animationFrameId) {
        lastTime = 0;
        animationFrameId = requestAnimationFrame(physicsLoop);
    }
}

function randomRange(min, max) { return Math.random() * (max - min) + min; }
function randomColor() { return `hsl(${Math.random() * 360}, 100%, 50%)`; }

function createConfetti() {
    var colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];
    // Confetti Cannon from bottom corners + Rain from top
    for (var i = 0; i < 250; i++) {
        var x, y, vx, vy;
        var r = Math.random();
        if (r < 0.4) { // Left Cannon
            x = -20; y = window.innerHeight;
            vx = randomRange(10, 25); vy = randomRange(-25, -10);
        } else if (r < 0.8) { // Right Cannon
            x = window.innerWidth + 20; y = window.innerHeight;
            vx = randomRange(-25, -10); vy = randomRange(-25, -10);
        } else { // Rain from top
            x = randomRange(0, window.innerWidth); y = -20;
            vx = randomRange(-5, 5); vy = randomRange(5, 15);
        }

        var p = new Particle(x, y, colors[Math.floor(Math.random() * colors.length)], randomRange(8, 16), Math.random() > 0.5 ? 'square' : 'circle');
        p.vx = vx;
        p.vy = vy;
        p.gravity = 0.4;
        p.drag = 0.95;
        p.vr = randomRange(-10, 10);
        p.life = randomRange(150, 300);
        spawnParticle(p);
    }
}

function createStarsBurst() {
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var stars = ['⭐', '🌟', '✨', '💫'];

    // Massive burst from center
    for (var i = 0; i < 150; i++) {
        var angle = randomRange(0, Math.PI * 2);
        var velocity = randomRange(10, 40);

        var p = new Particle(cx, cy, stars[Math.floor(Math.random() * stars.length)], randomRange(20, 50), 'text');
        p.vx = Math.cos(angle) * velocity;
        p.vy = Math.sin(angle) * velocity;
        p.gravity = 0.2; // Floatier
        p.drag = 0.92; // Slow down fast
        p.vr = randomRange(-5, 5);
        p.life = randomRange(100, 250);
        spawnParticle(p);
    }
}

function createFireworks() {
    var colors = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];
    // 8 Random explosions
    for (var i = 0; i < 8; i++) {
        setTimeout(function () {
            var cx = randomRange(100, window.innerWidth - 100);
            var cy = randomRange(100, window.innerHeight / 2);
            var color = colors[Math.floor(Math.random() * colors.length)];

            for (var j = 0; j < 80; j++) {
                var angle = randomRange(0, Math.PI * 2);
                var velocity = randomRange(5, 25);

                var p = new Particle(cx, cy, color, randomRange(4, 8), 'circle');
                p.vx = Math.cos(angle) * velocity;
                p.vy = Math.sin(angle) * velocity;
                p.gravity = 0.3;
                p.drag = 0.94;
                p.life = randomRange(100, 200);
                p.decay = randomRange(0.5, 1);
                spawnParticle(p);
            }
        }, i * 300);
    }
}

function createEmojiRain() {
    var emojis = ['🎉', '🔥', '⭐', '💎', '🏆', '🎊', '🥳', '💪'];
    // Continuous rain
    var interval = setInterval(function () {
        for (var i = 0; i < 2; i++) { // Reduced from 3
            var p = new Particle(randomRange(0, window.innerWidth), -50, emojis[Math.floor(Math.random() * emojis.length)], randomRange(30, 60), 'text');
            p.vx = randomRange(-2, 2);
            p.vy = randomRange(5, 15);
            p.gravity = 0.1;
            p.vr = randomRange(-5, 5);
            p.life = 200; // Reduced life
            spawnParticle(p);
        }
    }, 60); // Increased interval to 60ms

    setTimeout(function () { clearInterval(interval); }, 3000); // Reduced duration
}

function createSpiralGalaxy() {
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var angle = 0;

    // Rotating emitter
    var interval = setInterval(function () {
        for (var i = 0; i < 5; i++) {
            var armOffset = (i % 2) * Math.PI; // 2 arms
            var pAngle = angle + armOffset + randomRange(-0.1, 0.1);
            var velocity = randomRange(5, 10);

            var hue = (angle * 50) % 360;
            var p = new Particle(cx, cy, `hsl(${hue}, 100%, 60%)`, randomRange(4, 8), 'circle');
            p.vx = Math.cos(pAngle) * velocity;
            p.vy = Math.sin(pAngle) * velocity;
            p.gravity = 0; // Space has no gravity
            p.drag = 0.98;
            p.life = 200;
            spawnParticle(p);
        }
        angle += 0.2;
    }, 16);

    setTimeout(function () { clearInterval(interval); }, 3000);
}

function createBubbles() {
    var colors = ['rgba(59,130,246,0.5)', 'rgba(168,85,247,0.5)', 'rgba(236,72,153,0.5)'];
    // Bubbles floating up
    var interval = setInterval(function () {
        for (var i = 0; i < 2; i++) {
            var p = new Particle(randomRange(0, window.innerWidth), window.innerHeight + 50, colors[Math.floor(Math.random() * colors.length)], randomRange(20, 60), 'circle');
            p.vx = randomRange(-1, 1);
            p.vy = randomRange(-2, -5); // Float up
            p.gravity = -0.01; // Anti-gravity aids floating
            p.drag = 0.99;
            p.life = 400;

            spawnParticle(p);
        }
    }, 30);

    setTimeout(function () { clearInterval(interval); }, 4000);
}

function createLightning() {
    // Flash
    var flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.backgroundColor = '#fff';
    flash.style.opacity = '0.8';
    flash.style.zIndex = '998';
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 100);
    setTimeout(() => {
        var flash2 = flash.cloneNode();
        document.body.appendChild(flash2);
        setTimeout(() => flash2.remove(), 100);
    }, 200);

    // Bolts & Sparks
    for (var i = 0; i < 15; i++) {
        var x = randomRange(10, window.innerWidth - 10);
        // Static Bolt
        var p = new Particle(x, 50, '⚡', randomRange(80, 150), 'text');
        p.gravity = 0;
        p.life = 30;
        spawnParticle(p);

        // Sparks falling from bolt
        for (var j = 0; j < 20; j++) {
            var s = new Particle(x, 150, '#f59e0b', randomRange(4, 8), 'square');
            s.vx = randomRange(-10, 10);
            s.vy = randomRange(-5, 10);
            s.gravity = 0.5;
            s.life = randomRange(50, 100);
            spawnParticle(s);
        }
    }
}

function createHearts() {
    var hearts = ['❤️', '💖', '💗', '💕'];
    // Fountain from bottom center
    var interval = setInterval(function () {
        for (var i = 0; i < 4; i++) {
            var p = new Particle(window.innerWidth / 2, window.innerHeight, hearts[Math.floor(Math.random() * hearts.length)], randomRange(20, 40), 'text');
            var angle = randomRange(-Math.PI / 2 - 0.5, -Math.PI / 2 + 0.5);
            var velocity = randomRange(15, 25);

            p.vx = Math.cos(angle) * velocity;
            p.vy = Math.sin(angle) * velocity;
            p.gravity = 0.4; // Fall back down
            p.drag = 0.96;
            p.life = 200;
            spawnParticle(p);
        }
    }, 30);

    setTimeout(function () { clearInterval(interval); }, 3000);
}

function createSparkles() {
    var sparkles = ['✨', '💫', '⭐', '🌟', '✴️'];
    // Drifting sparkles
    for (var i = 0; i < 60; i++) {
        var p = new Particle(randomRange(0, window.innerWidth), randomRange(0, window.innerHeight), sparkles[Math.floor(Math.random() * sparkles.length)], randomRange(10, 30), 'text');
        p.vx = randomRange(-0.5, 0.5);
        p.vy = randomRange(-0.5, 0.5);
        p.gravity = 0;
        p.vr = randomRange(-2, 2);
        p.life = randomRange(100, 300);
        spawnParticle(p);
    }
}

function createPixelExplosion() {
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var neonColors = ['#ff0080', '#ff8c00', '#40e0d0', '#7b68ee', '#00ff41', '#ffff00'];

    // 3 Waves of pixel burst
    for (var wave = 0; wave < 3; wave++) {
        setTimeout(function () {
            for (var i = 0; i < 60; i++) {
                var angle = randomRange(0, Math.PI * 2);
                var velocity = randomRange(10, 35);
                var col = neonColors[Math.floor(Math.random() * neonColors.length)];

                var p = new Particle(cx, cy, col, randomRange(4, 10), 'square');
                p.vx = Math.cos(angle) * velocity;
                p.vy = Math.sin(angle) * velocity;
                p.gravity = 0.1;
                p.drag = 0.92; // Heavy drag for "grid" feel
                p.life = 150;

                spawnParticle(p);
            }
        }, wave * 200);
    }
}

// Random celebration animation picker
var _lastCelebration = -1;
function playCelebration() {
    var animations = [
        createConfetti, createStarsBurst, createFireworks, createEmojiRain,
        createSpiralGalaxy, createBubbles, createLightning, createHearts,
        createSparkles, createPixelExplosion
    ];
    var idx;
    do { idx = Math.floor(Math.random() * animations.length); } while (idx === _lastCelebration && animations.length > 1);
    _lastCelebration = idx;
    animations[idx]();
}

function addHabit(name, icon, targetDays) {
    var colors = ["blue", "purple", "red", "green", "yellow"];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var gems = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];
    var descs = ["Daily practice to improve skills", "Build consistency with this habit", "Important for personal growth", "Essential for your well-being", "Key to achieving your goals"];
    var nh = createHabit(name, icon, color, gems, descs[Math.floor(Math.random() * descs.length)], targetDays);
    appState.habits.push(nh);
    appState.habitsCreated++;
    showToast('New habit created: ' + name, 'success');
    renderHabits(); renderProfileHabits(); renderHabitPerformance(); updateStats(); checkAchievements(); saveState(); playCelebration();
}

function exportData() {
    var b = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
    var u = URL.createObjectURL(b);
    var a = document.createElement('a');
    a.href = u; a.download = 'habithero-data.json'; a.click();
    URL.revokeObjectURL(u);
    appState.dataExported = (appState.dataExported || 0) + 1;
    showToast('Data exported successfully!', 'success');
    checkAchievements(); saveState();
}

function importData() {
    var input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = function (e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (ev) {
            try {
                var data = JSON.parse(ev.target.result);
                if (data.habits && data.completedDays) {
                    Object.assign(appState, data);
                    appState.today = new Date();
                    appState.dataImported = (appState.dataImported || 0) + 1;
                    saveState();
                    showToast('Data imported successfully! Reloading...', 'success');
                    setTimeout(function () { location.reload(); }, 1500);
                } else {
                    showToast('Invalid data file', 'error');
                }
            } catch (err) {
                showToast('Error reading file: ' + err.message, 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function resetData() { if (confirm('Delete ALL data? This cannot be undone.')) { localStorage.removeItem('habitHeroState'); location.reload(); } }

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    var el = document.getElementById(pageId + '-page');
    if (el) el.classList.add('active');
    // Track pages visited for achievement
    if (appState.pagesVisited && appState.pagesVisited.indexOf(pageId) === -1) {
        appState.pagesVisited.push(pageId);
        checkAchievements(); saveState();
    }
    // Update nav active state
    document.querySelectorAll('nav a.nav-link').forEach(function (l) { l.classList.remove('text-green-500', 'text-accent'); l.classList.add('text-gray-500'); });
    var al = document.querySelector('nav a.nav-link[onclick="showPage(\'' + pageId + '\')"]');
    if (al) { al.classList.remove('text-gray-500'); al.classList.add('text-accent'); }
    if (pageId === 'rewards') renderRewards();
    if (pageId === 'progress') { initProgressChart(); renderAdditionalGraphs(); }
    if (pageId === 'profile') { renderAchievements(); renderProfileHabits(); }
}

// ===== WEEKLY SUMMARY =====
function renderWeeklySummary() {
    var container = document.getElementById('weekly-summary');
    if (!container) return;
    var today = new Date();
    var weekCompletions = 0;
    var weekGems = 0;
    var bestDay = 0;
    for (var i = 0; i < 7; i++) {
        var d = new Date(today);
        d.setDate(d.getDate() - i);
        var dk = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
        var status = appState.completedDays[dk];
        if (status === 'completed') { weekCompletions++; bestDay = Math.max(bestDay, appState.habits.length); }
        else if (status === 'partial') { weekCompletions++; bestDay = Math.max(bestDay, Math.ceil(appState.habits.length / 2)); }
    }
    weekGems = weekCompletions * (appState.habits.length > 0 ? appState.habits.reduce(function (a, h) { return a + h.gems; }, 0) / appState.habits.length : 0);
    container.innerHTML = '<div class="grid grid-cols-3 gap-4 text-center"><div><div class="text-2xl font-bold text-blue-600">' + weekCompletions + '</div><div class="text-xs text-gray-500">Active Days</div></div><div><div class="text-2xl font-bold text-green-600">' + Math.round(weekGems) + '</div><div class="text-xs text-gray-500">Gems Earned</div></div><div><div class="text-2xl font-bold text-purple-600">' + bestDay + '</div><div class="text-xs text-gray-500">Best Day Habits</div></div></div>';
}

// ===== INIT APP =====
function initApp() {
    loadState();
    if (appState.habits.length === 0) {
        appState.habits = [
            createHabit("Code Practice", "fa-code", "blue", 10, "30 minutes of coding practice"),
            createHabit("Read Book", "fa-book-open", "purple", 25, "Read 50 pages this week"),
            createHabit("Past Papers", "fa-file-lines", "red", 50, "Complete 1 past paper this week")
        ];
        appState.habitsCreated = 3;
    }
    var todayStr = new Date().toDateString();
    if (appState.lastCompletedDate !== todayStr) {
        appState.habits.forEach(function (h) { h.completedToday = false; });
        appState.completedToday = false;
        appState.gemChestsToday = 0; // Reset daily shop limit
        // Reset streak if the last completed date was not yesterday
        if (appState.lastCompletedDate) {
            var lastDate = new Date(appState.lastCompletedDate);
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastDate.toDateString() !== yesterday.toDateString()) {
                if (appState.streakFreezes > 0) {
                    appState.streakFreezes--;
                    appState.freezesUsed++;
                    appState.lastCompletedDate = yesterday.toDateString(); // Save streak
                    showToast('Streak Freeze used! Streak saved.', 'info');
                } else {
                    appState.currentStreak = 0;
                }
            }
        }
    }
    // Check Double XP Expiry
    if (appState.doubleXP && appState.doubleXPExpiry && new Date() > new Date(appState.doubleXPExpiry)) {
        appState.doubleXP = false;
        appState.doubleXPExpiry = null;
        showToast('Double XP expired.', 'info');
    }
    appState.today = new Date();
    // Always open calendar to current month/year
    appState.currentMonth = new Date().getMonth();
    appState.currentYear = new Date().getFullYear();

    if (appState.darkMode) document.documentElement.classList.add('dark');
    // Apply saved accent color
    if (appState.accentColor && appState.accentColor !== 'green') {
        setAccent(appState.accentColor);
    }
    renderHabits(); renderRewards(); renderCalendar(); renderProfileHabits();
    renderHabitPerformance(); updateStats(); updateGemDisplay(); updateXPDisplay();
    initProgressChart(); renderAchievements(); setDailyQuote(); renderShop();
    // Add default graphs if none exist
    if (appState.graphs.length === 0) {
        addGraph('line', 'Habit Completion Trend', 'Last 7 Days', 'Completion Rate', 'blue-purple');
        addGraph('bar', 'Habit Performance', 'Current Month', 'Completion Percentage', 'green-teal');
    } else {
        renderAdditionalGraphs();
    }
    checkAchievements(); saveState();

    // Notification Check
    if ("Notification" in window && Notification.permission === "granted" && !sessionStorage.getItem('notified')) {
        new Notification("Welcome back to HabitHero!", { body: "Keep up your streak!", icon: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png" });
        sessionStorage.setItem('notified', 'true');
    }
}

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function () {
    initApp();

    // Habit search
    var searchInput = document.getElementById('habit-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () { renderHabits(this.value); });
    }

    document.addEventListener('click', function (e) {
        var t = e.target;
        var sb = t.closest('.streak-btn');
        if (sb && !sb.classList.contains('completed')) { completeHabit(parseInt(sb.getAttribute('data-habit-id'))); return; }
        if (t.closest('#complete-all-btn') && !appState.completedToday) { completeAllHabits(); return; }
        var cb = t.closest('.claim-reward-btn');
        if (cb) { claimReward(parseInt(cb.getAttribute('data-reward-id'))); return; }
        if (t.closest('#claim-all-rewards-btn')) { appState.rewards.forEach(function (r) { if (!r.claimed) claimReward(r.id); }); return; }
        if (t.closest('#prev-month')) { appState.currentMonth--; if (appState.currentMonth < 0) { appState.currentMonth = 11; appState.currentYear--; } renderCalendar(); return; }
        if (t.closest('#next-month')) { appState.currentMonth++; if (appState.currentMonth > 11) { appState.currentMonth = 0; appState.currentYear++; } renderCalendar(); return; }
        if (t.closest('#close-modal') || t.id === 'claim-reward-btn') { document.getElementById('celebration-modal').classList.add('hidden'); return; }
        var dg = t.closest('.delete-graph');
        if (dg) { var gid = parseFloat(dg.getAttribute('data-graph-id')); appState.graphs = appState.graphs.filter(function (g) { return g.id !== gid; }); renderAdditionalGraphs(); saveState(); return; }
        var kb = t.closest('.kebab-toggle');
        if (kb) { e.preventDefault(); document.querySelectorAll('.kebab-dropdown').forEach(function (d) { d.classList.remove('show'); }); kb.nextElementSibling.classList.toggle('show'); return; }
        var eb = t.closest('.edit-habit-btn');
        if (eb) { e.preventDefault(); editHabit(parseInt(eb.getAttribute('data-habit-id'))); return; }
        var db = t.closest('.delete-habit-btn');
        if (db) { e.preventDefault(); if (confirm('Delete this habit?')) deleteHabit(parseInt(db.getAttribute('data-habit-id'))); return; }
        document.querySelectorAll('.kebab-dropdown').forEach(function (d) { d.classList.remove('show'); });
    });

    document.getElementById('year-select').addEventListener('change', function () { appState.currentYear = parseInt(this.value); renderCalendar(); });
    document.getElementById('add-habit-btn').addEventListener('click', function () { document.getElementById('add-habit-modal').classList.remove('hidden'); document.body.classList.add('overflow-hidden'); });
    document.getElementById('close-add-habit-modal').addEventListener('click', function () { document.getElementById('add-habit-modal').classList.add('hidden'); document.body.classList.remove('overflow-hidden'); });
    document.getElementById('cancel-habit').addEventListener('click', function () { document.getElementById('add-habit-modal').classList.add('hidden'); document.body.classList.remove('overflow-hidden'); });
    document.querySelectorAll('.icon-option').forEach(function (o) { o.addEventListener('click', function () { document.querySelectorAll('.icon-option').forEach(function (x) { x.classList.remove('selected'); }); this.classList.add('selected'); }); });
    document.querySelectorAll('.day-pill').forEach(function (p) { p.addEventListener('click', function () { this.classList.toggle('selected'); }); });
    document.getElementById('habit-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('habit-name').value;
        var si = document.querySelector('.icon-option.selected');
        if (!name || !si) { showToast('Please enter a name and select an icon', 'warning'); return; }

        var selectedDays = [];
        document.querySelectorAll('.day-pill.selected').forEach(function (p) {
            selectedDays.push(p.getAttribute('data-day'));
        });
        if (selectedDays.length === 0) selectedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']; // Default to all if none selected

        addHabit(name, si.getAttribute('data-icon'), selectedDays);
        this.reset();
        document.querySelectorAll('.icon-option').forEach(function (o) { o.classList.remove('selected'); });
        document.querySelectorAll('.day-pill').forEach(function (p) { p.classList.remove('selected'); });
        document.getElementById('add-habit-modal').classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    });
    document.getElementById('add-graph-btn').addEventListener('click', function () { document.getElementById('add-graph-modal').classList.remove('hidden'); });
    document.getElementById('filter-btn').addEventListener('click', function () {
        const m = document.getElementById('filters-modal');
        m.classList.remove('hidden');
        m.classList.add('flex');
    });
    document.getElementById('close-add-graph-modal').addEventListener('click', function () { document.getElementById('add-graph-modal').classList.add('hidden'); });
    document.getElementById('close-filters-modal').addEventListener('click', function () {
        const m = document.getElementById('filters-modal');
        m.classList.add('hidden');
        m.classList.remove('flex');
    });
    document.getElementById('cancel-graph').addEventListener('click', function () { document.getElementById('add-graph-modal').classList.add('hidden'); });
    document.getElementById('cancel-filters').addEventListener('click', function () {
        const m = document.getElementById('filters-modal');
        m.classList.add('hidden');
        m.classList.remove('flex');
    });
    document.querySelectorAll('.graph-preset[data-type]').forEach(function (p) { p.addEventListener('click', function () { document.querySelectorAll('.graph-preset[data-type]').forEach(function (x) { x.classList.remove('selected'); }); this.classList.add('selected'); }); });
    document.querySelectorAll('.graph-preset[data-preset]').forEach(function (p) { p.addEventListener('click', function () { document.querySelectorAll('.graph-preset[data-preset]').forEach(function (x) { x.classList.remove('selected'); }); this.classList.add('selected'); }); });
    document.getElementById('create-graph').addEventListener('click', function () {
        var st = document.querySelector('.graph-preset[data-type].selected');
        if (!st) { showToast('Please select a graph type', 'warning'); return; }
        var sp = document.querySelector('.graph-preset[data-preset].selected');
        var type = st.getAttribute('data-type');
        addGraph(type, type.charAt(0).toUpperCase() + type.slice(1) + ' Analysis', 'Last 7 Days', 'Completion Rate', sp ? sp.getAttribute('data-preset') : 'blue-purple');
        document.getElementById('add-graph-modal').classList.add('hidden');
        saveState();
    });
    document.getElementById('apply-filters').addEventListener('click', function () {
        var tr = document.querySelector('.filter-btn.selected');
        appState.activeFilters = {
            timeRange: tr ? tr.getAttribute('data-filter') : null,
            categories: [], // Placeholder for future category filtering
            status: []
        };
        showToast('Filters applied!', 'success');
        document.getElementById('filters-modal').classList.add('hidden');
        renderAdditionalGraphs();
    });

    document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.remove('selected', 'bg-green-100', 'border-green-500', 'text-green-700'); });
            this.classList.add('selected', 'bg-green-100', 'border-green-500', 'text-green-700');
        });
    });
    var ts = document.querySelector('#settings-page select');
    if (ts) {
        if (appState.darkMode) ts.value = 'Dark';
        ts.addEventListener('change', function () {
            if (this.value === 'Dark') setDarkMode(true);
            else if (this.value === 'Light') setDarkMode(false);
            else { setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches); }
        });
    }
    document.getElementById('save-settings-btn').addEventListener('click', function () {
        saveState();
        var notif = document.getElementById('notifications').checked;
        if (notif && "Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") showToast('Notifications enabled!', 'success');
            });
        }
        showToast('Settings saved!', 'success');
    });
    document.getElementById('export-data-btn').addEventListener('click', exportData);
    var importBtn = document.getElementById('import-data-btn');
    if (importBtn) importBtn.addEventListener('click', importData);
    document.getElementById('reset-data-btn').addEventListener('click', resetData);
});

// ===== HABIT NOTES =====
var currentNoteHabitId = null;

function openNotes(habitId) {
    currentNoteHabitId = habitId;
    var h = appState.habits.find(function (h) { return h.id === habitId; });
    if (!h) return;
    document.getElementById('notes-habit-name').textContent = h.name + ' Notes';
    if (!h.notes) h.notes = [];
    renderNotes();
    const m = document.getElementById('notes-modal');
    m.classList.remove('hidden');
    m.classList.add('flex');
}

function renderNotes() {
    var list = document.getElementById('notes-list');
    list.innerHTML = '';
    var h = appState.habits.find(function (h) { return h.id === currentNoteHabitId; });
    if (!h || !h.notes || h.notes.length === 0) {
        list.innerHTML = '<div class="text-gray-400 text-center py-4">No notes yet. Add one!</div>';
        return;
    }
    h.notes.forEach(function (note, index) {
        var d = document.createElement('div');
        d.className = 'bg-gray-50 p-3 rounded-lg flex justify-between items-start group mb-2';
        d.innerHTML = '<div><p class="text-sm text-gray-800">' + note.text + '</p><p class="text-xs text-gray-400 mt-1">' + new Date(note.date).toLocaleString() + '</p></div><button class="delete-note-btn text-gray-300 hover:text-red-500 transition-opacity" onclick="deleteNote(' + index + ')"><i class="fas fa-trash"></i></button>';
        list.appendChild(d);
    });
}

function addNote() {
    var input = document.getElementById('new-note-input');
    var text = input.value.trim();
    if (!text || !currentNoteHabitId) return;
    var h = appState.habits.find(function (h) { return h.id === currentNoteHabitId; });
    if (h) {
        if (!h.notes) h.notes = [];
        h.notes.unshift({ text: text, date: new Date().toISOString() });
        saveState();
        renderNotes();
        input.value = '';
    }
}

function deleteNote(index) {
    var h = appState.habits.find(function (h) { return h.id === currentNoteHabitId; });
    if (h && h.notes) {
        h.notes.splice(index, 1);
        saveState();
        renderNotes();
    }
}

// Global Event Listeners for Notes buttons
document.addEventListener('click', function (e) {
    var btn = e.target.closest('.notes-habit-btn');
    if (btn) {
        e.preventDefault();
        var hid = parseInt(btn.getAttribute('data-habit-id'));
        openNotes(hid);
        document.querySelectorAll('.kebab-dropdown').forEach(function (d) { d.classList.remove('show'); });
    }
    if (e.target.id === 'close-notes-modal' || e.target.closest('#close-notes-modal')) {
        const m = document.getElementById('notes-modal');
        m.classList.add('hidden');
        m.classList.remove('flex');
    }
    if (e.target.id === 'add-note-btn' || e.target.closest('#add-note-btn')) {
        addNote();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var noteInput = document.getElementById('new-note-input');
    if (noteInput) {
        noteInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') addNote();
        });
    }
});

// ===== ACHIEVEMENTS TOGGLE =====
document.addEventListener('DOMContentLoaded', function () {
    const list = document.getElementById('achievements-scroll-wrapper');
    const fade = document.getElementById('achievements-fade');
    const btn = document.getElementById('toggle-achievements-btn');
    const arrow = document.getElementById('toggle-achievements-arrow');
    let isExpanded = false;

    if (btn && list && arrow) {
        btn.addEventListener('click', function () {
            isExpanded = !isExpanded;
            if (isExpanded) {
                list.style.maxHeight = '1000px';
                list.classList.remove('overflow-hidden');
                list.classList.add('overflow-y-auto');
                arrow.style.transform = 'rotate(180deg)';
                fade.style.opacity = '0';
            } else {
                list.style.maxHeight = '';
                list.classList.add('overflow-hidden');
                list.classList.remove('overflow-y-auto');
                list.scrollTop = 0;
                arrow.style.transform = 'rotate(0deg)';
                fade.style.opacity = '1';
            }
        });

        function updateFade() {
            if (appState.darkMode) {
                fade.style.background = 'linear-gradient(to top, #1e293b, transparent)';
            } else {
                fade.style.background = 'linear-gradient(to top, #ffffff, transparent)';
            }
        }

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'class') {
                    updateFade();
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });
        updateFade();
    }
});

// ===== SIGN OUT LOGIC =====
document.addEventListener('DOMContentLoaded', function () {
    var signOutBtn = document.getElementById('confirm-signout-btn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function () {
            localStorage.removeItem('habitHeroState');
            location.reload();
        });
    }
});

// ==========================================
//  AUTH & CLOUD SYNC INTEGRATION
// ==========================================

// ==========================================
//  AUTH & CLOUD SYNC INTEGRATION
// ==========================================

var currentUser = null;

// 1. Initialize Auth on Load
document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Init Supabase Auth
        // Wait for auth.js to be ready (it's a script tag, so functions are global)
        if (typeof initAuth === 'function') {
            currentUser = await initAuth();
            updateProfileUI();

            // Load Data
            if (currentUser) {
                console.log("📥 Fetching cloud data for user:", currentUser.email);
                const cloudData = await loadUserData(currentUser.id);
                if (cloudData) {
                    console.log("✅ Cloud data found, overwriting local state.");
                    // Merge cloud data into appState
                    Object.assign(appState, cloudData);
                    // Re-attach functions (since JSON loses them)
                    rehydrateState();
                    saveState(false); // Save to local but don't re-upload immediately
                    showToast('Synced with cloud!', 'success');
                } else {
                    console.log("⚠️ No cloud data found. Uploading local data as initial state.");
                    // New user or first time sync: Upload current local data
                    await saveUserData(currentUser.id, appState);
                }
            } else {
                console.log("👤 Guest mode.");
            }
        }
    } catch (e) {
        console.error("Auth Init Error:", e);
        showToast('Error connecting to cloud', 'error');
    } finally {
        // Render App
        renderHabits();
        updateStats();
        renderCalendar();
        renderAchievements();
        setDailyQuote();
    }
});

// 2. Override saveState to sync with cloud
const originalSaveState = saveState;
saveState = function (uploadToCloud = true) {
    // 1. Save to LocalStorage (Standard behavior)
    const s = Object.assign({}, appState);
    s.today = null; // Don't save Date object
    localStorage.setItem('habitHeroState', JSON.stringify(s));

    // 2. Sync to Cloud (if logged in)
    if (currentUser && uploadToCloud) {
        // Debounce or just fire and forget
        // For simplicity, we fire and forget here, but in prod you'd want debouncing
        saveUserData(currentUser.id, s).catch(err => console.error("Cloud Sync Failed", err));
    }
};

// Helper to restore function methods after JSON load
function rehydrateState() {
    appState.today = new Date();
    // Default Rewards Checks
    var defaultChecks = {
        1: function (s) { return s.longestStreak >= 7; },
        2: function (s) { return Object.values(s.completedDays).filter(function (v) { return v === 'completed'; }).length >= 30; },
        3: function (s) { return s.level >= 10; }
    };
    appState.rewards.forEach(function (r) {
        if (defaultChecks[r.id]) r.check = defaultChecks[r.id];
    });
}

// 3. UI Functions

function updateProfileUI() {
    const emailDisplay = document.getElementById('user-email-display');
    const signInBtn = document.getElementById('nav-signin');
    const signOutBtn = document.getElementById('nav-signout');

    if (currentUser) {
        if (emailDisplay) emailDisplay.textContent = currentUser.email;
        if (signInBtn) signInBtn.classList.add('hidden'); // Hide Sign In
        if (signOutBtn) signOutBtn.classList.remove('hidden'); // Show Sign Out
    } else {
        if (emailDisplay) emailDisplay.textContent = 'Guest User';
        if (signInBtn) signInBtn.classList.remove('hidden'); // Show Sign In
        if (signOutBtn) signOutBtn.classList.add('hidden'); // Hide Sign Out
    }
}

// Modal Controls
function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // Default to Login
    isLoginMode = true;
    updateAuthModalUI();
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.getElementById('auth-error').classList.add('hidden');
    document.getElementById('auth-form').reset();
}

// Toggle Login/Signup
let isLoginMode = true;
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    updateAuthModalUI();
}

function updateAuthModalUI() {
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const submitBtn = document.getElementById('auth-submit-btn');
    const switchText = document.getElementById('auth-switch-text');
    const switchBtn = document.getElementById('auth-switch-btn');

    if (isLoginMode) {
        title.textContent = 'Welcome Back';
        subtitle.textContent = 'Sign in to sync your habits';
        submitBtn.textContent = 'Sign In';
        switchText.textContent = "Don't have an account?";
        switchBtn.textContent = 'Sign Up';
    } else {
        title.textContent = 'Create Account';
        subtitle.textContent = 'Start your journey today';
        submitBtn.textContent = 'Sign Up';
        switchText.textContent = "Already have an account?";
        switchBtn.textContent = 'Sign In';
    }
}

// Form Submission
document.getElementById('auth-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const errorBox = document.getElementById('auth-error');
    const errorText = document.getElementById('auth-error-text');
    const submitBtn = document.getElementById('auth-submit-btn');

    // Reset error
    errorBox.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    try {
        if (isLoginMode) {
            await authLogin(email, password);
            showToast('Welcome back! Syncing...', 'success');
            setTimeout(() => window.location.reload(), 1000); // Reload to load cloud data
        } else {
            await authSignup(email, password);
            showToast('Account created! Please check your email.', 'success');
            // Supabase usually requires email confirmation, or auto-logs in. 
            // If default config, it might auto-login.
            setTimeout(() => window.location.reload(), 1500);
        }
        closeAuthModal();
    } catch (err) {
        console.error(err);
        errorText.textContent = err.message || "Authentication failed";
        errorBox.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = isLoginMode ? 'Sign In' : 'Sign Up';
    }
});

function handleGoogleLogin() {
    authLoginGoogle().catch(err => {
        console.error(err);
        showToast('Google Login failed', 'error');
    });
}

function handleLogout() {
    if (confirm('Are you sure you want to sign out?')) {
        authLogout().then(() => {
            window.location.reload();
        });
    }
}
