package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.PersonnelAppui;
import mefpai.gouv.sn.domain.enumeration.FonctionPersApp;
import mefpai.gouv.sn.domain.enumeration.Situation;
import mefpai.gouv.sn.repository.PersonnelAppuiRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PersonnelAppuiResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PersonnelAppuiResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final Situation DEFAULT_SITUATION_MATRIMONIALE = Situation.MARIE;
    private static final Situation UPDATED_SITUATION_MATRIMONIALE = Situation.MARIEE;

    private static final FonctionPersApp DEFAULT_FONCTION = FonctionPersApp.GARDIEN;
    private static final FonctionPersApp UPDATED_FONCTION = FonctionPersApp.TECHNICIENSURFACE;

    private static final String DEFAULT_AUTRE_FOCTION = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_FOCTION = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_MAIL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/personnel-appuis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PersonnelAppuiRepository personnelAppuiRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersonnelAppuiMockMvc;

    private PersonnelAppui personnelAppui;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonnelAppui createEntity(EntityManager em) {
        PersonnelAppui personnelAppui = new PersonnelAppui()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .situationMatrimoniale(DEFAULT_SITUATION_MATRIMONIALE)
            .fonction(DEFAULT_FONCTION)
            .autreFoction(DEFAULT_AUTRE_FOCTION)
            .telephone(DEFAULT_TELEPHONE)
            .mail(DEFAULT_MAIL);
        return personnelAppui;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonnelAppui createUpdatedEntity(EntityManager em) {
        PersonnelAppui personnelAppui = new PersonnelAppui()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE)
            .fonction(UPDATED_FONCTION)
            .autreFoction(UPDATED_AUTRE_FOCTION)
            .telephone(UPDATED_TELEPHONE)
            .mail(UPDATED_MAIL);
        return personnelAppui;
    }

    @BeforeEach
    public void initTest() {
        personnelAppui = createEntity(em);
    }

    @Test
    @Transactional
    void createPersonnelAppui() throws Exception {
        int databaseSizeBeforeCreate = personnelAppuiRepository.findAll().size();
        // Create the PersonnelAppui
        restPersonnelAppuiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isCreated());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeCreate + 1);
        PersonnelAppui testPersonnelAppui = personnelAppuiList.get(personnelAppuiList.size() - 1);
        assertThat(testPersonnelAppui.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPersonnelAppui.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testPersonnelAppui.getSituationMatrimoniale()).isEqualTo(DEFAULT_SITUATION_MATRIMONIALE);
        assertThat(testPersonnelAppui.getFonction()).isEqualTo(DEFAULT_FONCTION);
        assertThat(testPersonnelAppui.getAutreFoction()).isEqualTo(DEFAULT_AUTRE_FOCTION);
        assertThat(testPersonnelAppui.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testPersonnelAppui.getMail()).isEqualTo(DEFAULT_MAIL);
    }

    @Test
    @Transactional
    void createPersonnelAppuiWithExistingId() throws Exception {
        // Create the PersonnelAppui with an existing ID
        personnelAppui.setId(1L);

        int databaseSizeBeforeCreate = personnelAppuiRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonnelAppuiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAppuiRepository.findAll().size();
        // set the field null
        personnelAppui.setNom(null);

        // Create the PersonnelAppui, which fails.

        restPersonnelAppuiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAppuiRepository.findAll().size();
        // set the field null
        personnelAppui.setPrenom(null);

        // Create the PersonnelAppui, which fails.

        restPersonnelAppuiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSituationMatrimonialeIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAppuiRepository.findAll().size();
        // set the field null
        personnelAppui.setSituationMatrimoniale(null);

        // Create the PersonnelAppui, which fails.

        restPersonnelAppuiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkFonctionIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAppuiRepository.findAll().size();
        // set the field null
        personnelAppui.setFonction(null);

        // Create the PersonnelAppui, which fails.

        restPersonnelAppuiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAppuiRepository.findAll().size();
        // set the field null
        personnelAppui.setTelephone(null);

        // Create the PersonnelAppui, which fails.

        restPersonnelAppuiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkMailIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAppuiRepository.findAll().size();
        // set the field null
        personnelAppui.setMail(null);

        // Create the PersonnelAppui, which fails.

        restPersonnelAppuiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPersonnelAppuis() throws Exception {
        // Initialize the database
        personnelAppuiRepository.saveAndFlush(personnelAppui);

        // Get all the personnelAppuiList
        restPersonnelAppuiMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personnelAppui.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].situationMatrimoniale").value(hasItem(DEFAULT_SITUATION_MATRIMONIALE.toString())))
            .andExpect(jsonPath("$.[*].fonction").value(hasItem(DEFAULT_FONCTION.toString())))
            .andExpect(jsonPath("$.[*].autreFoction").value(hasItem(DEFAULT_AUTRE_FOCTION)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL)));
    }

    @Test
    @Transactional
    void getPersonnelAppui() throws Exception {
        // Initialize the database
        personnelAppuiRepository.saveAndFlush(personnelAppui);

        // Get the personnelAppui
        restPersonnelAppuiMockMvc
            .perform(get(ENTITY_API_URL_ID, personnelAppui.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(personnelAppui.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.situationMatrimoniale").value(DEFAULT_SITUATION_MATRIMONIALE.toString()))
            .andExpect(jsonPath("$.fonction").value(DEFAULT_FONCTION.toString()))
            .andExpect(jsonPath("$.autreFoction").value(DEFAULT_AUTRE_FOCTION))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL));
    }

    @Test
    @Transactional
    void getNonExistingPersonnelAppui() throws Exception {
        // Get the personnelAppui
        restPersonnelAppuiMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPersonnelAppui() throws Exception {
        // Initialize the database
        personnelAppuiRepository.saveAndFlush(personnelAppui);

        int databaseSizeBeforeUpdate = personnelAppuiRepository.findAll().size();

        // Update the personnelAppui
        PersonnelAppui updatedPersonnelAppui = personnelAppuiRepository.findById(personnelAppui.getId()).get();
        // Disconnect from session so that the updates on updatedPersonnelAppui are not directly saved in db
        em.detach(updatedPersonnelAppui);
        updatedPersonnelAppui
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE)
            .fonction(UPDATED_FONCTION)
            .autreFoction(UPDATED_AUTRE_FOCTION)
            .telephone(UPDATED_TELEPHONE)
            .mail(UPDATED_MAIL);

        restPersonnelAppuiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPersonnelAppui.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPersonnelAppui))
            )
            .andExpect(status().isOk());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeUpdate);
        PersonnelAppui testPersonnelAppui = personnelAppuiList.get(personnelAppuiList.size() - 1);
        assertThat(testPersonnelAppui.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersonnelAppui.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersonnelAppui.getSituationMatrimoniale()).isEqualTo(UPDATED_SITUATION_MATRIMONIALE);
        assertThat(testPersonnelAppui.getFonction()).isEqualTo(UPDATED_FONCTION);
        assertThat(testPersonnelAppui.getAutreFoction()).isEqualTo(UPDATED_AUTRE_FOCTION);
        assertThat(testPersonnelAppui.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testPersonnelAppui.getMail()).isEqualTo(UPDATED_MAIL);
    }

    @Test
    @Transactional
    void putNonExistingPersonnelAppui() throws Exception {
        int databaseSizeBeforeUpdate = personnelAppuiRepository.findAll().size();
        personnelAppui.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonnelAppuiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, personnelAppui.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPersonnelAppui() throws Exception {
        int databaseSizeBeforeUpdate = personnelAppuiRepository.findAll().size();
        personnelAppui.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonnelAppuiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPersonnelAppui() throws Exception {
        int databaseSizeBeforeUpdate = personnelAppuiRepository.findAll().size();
        personnelAppui.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonnelAppuiMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(personnelAppui)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePersonnelAppuiWithPatch() throws Exception {
        // Initialize the database
        personnelAppuiRepository.saveAndFlush(personnelAppui);

        int databaseSizeBeforeUpdate = personnelAppuiRepository.findAll().size();

        // Update the personnelAppui using partial update
        PersonnelAppui partialUpdatedPersonnelAppui = new PersonnelAppui();
        partialUpdatedPersonnelAppui.setId(personnelAppui.getId());

        partialUpdatedPersonnelAppui.prenom(UPDATED_PRENOM).fonction(UPDATED_FONCTION).autreFoction(UPDATED_AUTRE_FOCTION);

        restPersonnelAppuiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersonnelAppui.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersonnelAppui))
            )
            .andExpect(status().isOk());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeUpdate);
        PersonnelAppui testPersonnelAppui = personnelAppuiList.get(personnelAppuiList.size() - 1);
        assertThat(testPersonnelAppui.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPersonnelAppui.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersonnelAppui.getSituationMatrimoniale()).isEqualTo(DEFAULT_SITUATION_MATRIMONIALE);
        assertThat(testPersonnelAppui.getFonction()).isEqualTo(UPDATED_FONCTION);
        assertThat(testPersonnelAppui.getAutreFoction()).isEqualTo(UPDATED_AUTRE_FOCTION);
        assertThat(testPersonnelAppui.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testPersonnelAppui.getMail()).isEqualTo(DEFAULT_MAIL);
    }

    @Test
    @Transactional
    void fullUpdatePersonnelAppuiWithPatch() throws Exception {
        // Initialize the database
        personnelAppuiRepository.saveAndFlush(personnelAppui);

        int databaseSizeBeforeUpdate = personnelAppuiRepository.findAll().size();

        // Update the personnelAppui using partial update
        PersonnelAppui partialUpdatedPersonnelAppui = new PersonnelAppui();
        partialUpdatedPersonnelAppui.setId(personnelAppui.getId());

        partialUpdatedPersonnelAppui
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE)
            .fonction(UPDATED_FONCTION)
            .autreFoction(UPDATED_AUTRE_FOCTION)
            .telephone(UPDATED_TELEPHONE)
            .mail(UPDATED_MAIL);

        restPersonnelAppuiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersonnelAppui.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersonnelAppui))
            )
            .andExpect(status().isOk());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeUpdate);
        PersonnelAppui testPersonnelAppui = personnelAppuiList.get(personnelAppuiList.size() - 1);
        assertThat(testPersonnelAppui.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersonnelAppui.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersonnelAppui.getSituationMatrimoniale()).isEqualTo(UPDATED_SITUATION_MATRIMONIALE);
        assertThat(testPersonnelAppui.getFonction()).isEqualTo(UPDATED_FONCTION);
        assertThat(testPersonnelAppui.getAutreFoction()).isEqualTo(UPDATED_AUTRE_FOCTION);
        assertThat(testPersonnelAppui.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testPersonnelAppui.getMail()).isEqualTo(UPDATED_MAIL);
    }

    @Test
    @Transactional
    void patchNonExistingPersonnelAppui() throws Exception {
        int databaseSizeBeforeUpdate = personnelAppuiRepository.findAll().size();
        personnelAppui.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonnelAppuiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, personnelAppui.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPersonnelAppui() throws Exception {
        int databaseSizeBeforeUpdate = personnelAppuiRepository.findAll().size();
        personnelAppui.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonnelAppuiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPersonnelAppui() throws Exception {
        int databaseSizeBeforeUpdate = personnelAppuiRepository.findAll().size();
        personnelAppui.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonnelAppuiMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(personnelAppui))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PersonnelAppui in the database
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePersonnelAppui() throws Exception {
        // Initialize the database
        personnelAppuiRepository.saveAndFlush(personnelAppui);

        int databaseSizeBeforeDelete = personnelAppuiRepository.findAll().size();

        // Delete the personnelAppui
        restPersonnelAppuiMockMvc
            .perform(delete(ENTITY_API_URL_ID, personnelAppui.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PersonnelAppui> personnelAppuiList = personnelAppuiRepository.findAll();
        assertThat(personnelAppuiList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
