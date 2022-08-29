import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'apprenant',
        data: { pageTitle: 'Apprenants' },
        loadChildren: () => import('./apprenant/apprenant.module').then(m => m.ApprenantModule),
      },
      {
        path: 'besoin',
        data: { pageTitle: 'Besoins' },
        loadChildren: () => import('./besoin/besoin.module').then(m => m.BesoinModule),
      },
      {
        path: 'recette',
        data: { pageTitle: 'Recettes' },
        loadChildren: () => import('./recette/recette.module').then(m => m.RecetteModule),
      },
      {
        path: 'niveaux-etudes',
        data: { pageTitle: 'NiveauxEtudes' },
        loadChildren: () => import('./niveaux-etudes/niveaux-etudes.module').then(m => m.NiveauxEtudesModule),
      },
      {
        path: 'enseignant',
        data: { pageTitle: 'Enseignants' },
        loadChildren: () => import('./enseignant/enseignant.module').then(m => m.EnseignantModule),
      },
      {
        path: 'examen',
        data: { pageTitle: 'Examen' },
        loadChildren: () => import('./examen/examen.module').then(m => m.ExamenModule),
      },
      {
        path: 'filiere',
        data: { pageTitle: 'Filieres' },
        loadChildren: () => import('./filiere/filiere.module').then(m => m.FiliereModule),
      },

      {
        path: 'materiel',
        data: { pageTitle: 'Materiels' },
        loadChildren: () => import('./materiel/materiel.module').then(m => m.MaterielModule),
      },

      {
        path: 'partenaire',
        data: { pageTitle: 'Partenaires' },
        loadChildren: () => import('./partenaire/partenaire.module').then(m => m.PartenaireModule),
      },

      {
        path: 'personnel-administratif',
        data: { pageTitle: 'PersonnelAdministratifs' },
        loadChildren: () => import('./personnel-administratif/personnel-administratif.module').then(m => m.PersonnelAdministratifModule),
      },
      {
        path: 'personnel-appui',
        data: { pageTitle: 'PersonnelAppuis' },
        loadChildren: () => import('./personnel-appui/personnel-appui.module').then(m => m.PersonnelAppuiModule),
      },
      {
        path: 'lycee-technique',
        data: { pageTitle: 'LyceeTechniques' },
        loadChildren: () => import('./lycee-technique/lycee-technique.module').then(m => m.LyceeTechniqueModule),
      },
      {
        path: 'salle',
        data: { pageTitle: 'Salles' },
        loadChildren: () => import('./salle/salle.module').then(m => m.SalleModule),
      },
      {
        path: 'serie',
        data: { pageTitle: 'Series' },
        loadChildren: () => import('./serie/serie.module').then(m => m.SerieModule),
      },
      {
        path: 'depense',
        data: { pageTitle: 'Depenses' },
        loadChildren: () => import('./depense/depense.module').then(m => m.DepenseModule),
      },
      {
        path: 'visite',
        data: { pageTitle: 'Visites' },
        loadChildren: () => import('./visite/visite.module').then(m => m.VisiteModule),
      },
      {
        path: 'programme',
        data: { pageTitle: 'Programmes' },
        loadChildren: () => import('./programme/programme.module').then(m => m.ProgrammeModule),
      },
      // {
      //   path: 'bon',
      //   data: { pageTitle: 'Bons' },
      //   loadChildren: () => import('./bon/bon.module').then(m => m.BonModule),
      // },
      // {
      //   path: 'status',
      //   data: { pageTitle: 'Statuses' },
      //   loadChildren: () => import('./status/status.module').then(m => m.StatusModule),
      // },
      {
        path: 'difficulte',
        data: { pageTitle: 'Difficultes' },
        loadChildren: () => import('./difficulte/difficulte.module').then(m => m.DifficulteModule),
      },
      {
        path: 'niveaux-calification',
        data: { pageTitle: 'NiveauxCalifications' },
        loadChildren: () => import('./niveaux-calification/niveaux-calification.module').then(m => m.NiveauxCalificationModule),
      },
      {
        path: 'reception',
        data: { pageTitle: 'Receptions' },
        loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule),
      },
      {
        path: 'attribution',
        data: { pageTitle: 'Attributions' },
        loadChildren: () => import('./attribution/attribution.module').then(m => m.AttributionModule),
      },
      {
        path: 'organe-gestion',
        data: { pageTitle: 'OrganeGestions' },
        loadChildren: () => import('./organe-gestion/organe-gestion.module').then(m => m.OrganeGestionModule),
      },
      {
        path: 'lycees-techniques',
        data: { pageTitle: 'LyceesTechniques' },
        loadChildren: () => import('./lycees-techniques/lycees-techniques.module').then(m => m.LyceesTechniquesModule),
      },
      {
        path: 'proviseur',
        data: { pageTitle: 'Proviseurs' },
        loadChildren: () => import('./proviseur/proviseur.module').then(m => m.ProviseurModule),
      },
      {
        path: 'directeur-etude',
        data: { pageTitle: 'DirecteurEtudes' },
        loadChildren: () => import('./directeur-etude/directeur-etude.module').then(m => m.DirecteurEtudeModule),
      },
      {
        path: 'comptable-matiere',
        data: { pageTitle: 'ComptableMatieres' },
        loadChildren: () => import('./comptable-matiere/comptable-matiere.module').then(m => m.ComptableMatiereModule),
      },
      {
        path: 'comptable-financier',
        data: { pageTitle: 'ComptableFinanciers' },
        loadChildren: () => import('./comptable-financier/comptable-financier.module').then(m => m.ComptableFinancierModule),
      },
      // {
      //   path: 'organe',
      //   data: { pageTitle: 'Organes' },
      //   loadChildren: () => import('./organe/organe.module').then(m => m.OrganeModule),
      // },
      // {
      //   path: 'probleme',
      //   data: { pageTitle: 'Problemes' },
      //   loadChildren: () => import('./probleme/probleme.module').then(m => m.ProblemeModule),
      // },
      {
        path: 'localisation',
        data: { pageTitle: 'Localisations' },
        loadChildren: () => import('./localisation/localisation.module').then(m => m.LocalisationModule),
      },
      {
        path: 'iventaire-des-matetiere',
        data: { pageTitle: 'IventaireDesMatetieres' },
        loadChildren: () => import('./iventaire-des-matetiere/iventaire-des-matetiere.module').then(m => m.IventaireDesMatetiereModule),
      },
      {
        path: 'mouvement-matiere',
        data: { pageTitle: 'MouvementMatieres' },
        loadChildren: () => import('./mouvement-matiere/mouvement-matiere.module').then(m => m.MouvementMatiereModule),
      },
      {
        path: 'reforme-matiere',
        data: { pageTitle: 'ReformeMatieres' },
        loadChildren: () => import('./reforme-matiere/reforme-matiere.module').then(m => m.ReformeMatiereModule),
      },
      {
        path: 'concours',
        data: { pageTitle: 'Concours' },
        loadChildren: () => import('./concours/concours.module').then(m => m.ConcoursModule),
      },
      {
        path: 'formation',
        data: { pageTitle: 'Formations' },
        loadChildren: () => import('./formation/formation.module').then(m => m.FormationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
