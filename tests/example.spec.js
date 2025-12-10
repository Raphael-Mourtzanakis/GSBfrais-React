// @ts-check
import { test, expect } from '@playwright/test';

/*
test('A le titre', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Vérifie si il y a le titre "GSB Frais" à la page
  await expect(page).toHaveTitle(/GSB Frais/);
});

test('Page de connexion', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Clique sur le bouton se connexion
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Vérifie qu'il y ait écrit "Connexion" dans un header dans la page
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
});
*/

test('Login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Clique sur le bouton se connexion
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Vérifie que l'URL est bien celle de la page login
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Inscrit les identifiants du compte
  await page.fill('input[name="login"]', "Andre");
  await page.fill('input[name="password"]', "secret");

  // Clique sur le bouton pour valider le formulaire
  await page.click('input[type="submit"]')

  // Vérifie si on est à la page du Dashboard
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  // Vérifie qu'il y ait bien écrit "Andre" dans la page
  //await expect(page.getByRole('paragraph', {name: "Andre"})).toBeVisible();
  // (Vérifier l'ID à la place)

  // Vérifie qu'il y ait le bouton Déconnexion à la place de Connexion
  //await expect(page.getByRole('link',{name: "Déconnexion"})).toBeVisible();
});

test('Login with invalid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Clique sur le bouton se connexion
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Vérifie que l'URL est bien celle de la page login
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Inscrit les identifiants du compte
  await page.fill('input[name="login"]', "Andre");
  await page.fill('input[name="password"]', "secrete");

  // Clique sur le bouton pour valider le formulaire
  await page.click('input[type="submit"]')

  // Vérifie si il y a une boîte de dialogue alert
  // Vérifie que l'alert dit que les identifiants sont incorrects
  // Clique sur le "Ok" de l'alert
  page.on("dialog", async (dialog) => { 
    expect(dialog.type()).toContain("alert"); 
    expect(dialog.message()).toContain("Identifiant ou mot de passe incorrect"); 
    await dialog.accept(); 
  });
});

test('Reload the Dashboard page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Se connecte pour avoir accès à la page Dashboard

    // Se dirige vers la page de connexion
    await page.goto('http://localhost:3000/login');

    // Inscrit les identifiants du compte
    await page.fill('input[name="login"]', "Andre");
    await page.fill('input[name="password"]', "secret");

    // Clique sur le bouton pour valider le formulaire
    await page.click('input[type="submit"]')

  // Vérifie si on est à la page du Dashboard
  // Puis reload
  // Et vérifie si on est encore dans la page Dashboard
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await page.reload();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('Logout from the account with the logout button', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Se connecte pour pouvoir se déconnecter ensuite

    // Se dirige vers la page de connexion
    await page.goto('http://localhost:3000/login');

    // Inscrit les identifiants du compte
    await page.fill('input[name="login"]', "Andre");
    await page.fill('input[name="password"]', "secret");

    // Clique sur le bouton pour valider le formulaire
    await page.click('input[type="submit"]')

  // Clique sur le bouton de Déconnexion
  await page.click('button[id="logout"]')

  // Vérifie que l'URL est bien celle de la page login
  await expect(page).toHaveURL('http://localhost:3000/login');
});