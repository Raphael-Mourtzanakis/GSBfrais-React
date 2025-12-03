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

test('Authentification', async ({ page }) => {
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
  await page.getByRole('paragraph',{name: 'Andre'});
});