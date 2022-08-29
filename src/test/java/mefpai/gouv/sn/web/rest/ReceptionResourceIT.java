package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.Reception;
import mefpai.gouv.sn.domain.enumeration.Group;
import mefpai.gouv.sn.domain.enumeration.ProvenanceMat;
import mefpai.gouv.sn.repository.ReceptionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ReceptionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ReceptionResourceIT {

    private static final String DEFAULT_LIBELLE_MATERIEL = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_MATERIEL = "BBBBBBBBBB";

    private static final Group DEFAULT_TYPE_GROUP = Group.GROUP1;
    private static final Group UPDATED_TYPE_GROUP = Group.GROUP2;

    private static final ProvenanceMat DEFAULT_PROVENANCE = ProvenanceMat.ETAT;
    private static final ProvenanceMat UPDATED_PROVENANCE = ProvenanceMat.PARTENAIRE;

    private static final String DEFAULT_FOURNISSEUR = "AAAAAAAAAA";
    private static final String UPDATED_FOURNISSEUR = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/receptions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ReceptionRepository receptionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReceptionMockMvc;

    private Reception reception;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reception createEntity(EntityManager em) {
        Reception reception = new Reception()
            .libelleMateriel(DEFAULT_LIBELLE_MATERIEL)
            .typeGroup(DEFAULT_TYPE_GROUP)
            .provenance(DEFAULT_PROVENANCE)
            .fournisseur(DEFAULT_FOURNISSEUR)
            .date(DEFAULT_DATE);
        return reception;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reception createUpdatedEntity(EntityManager em) {
        Reception reception = new Reception()
            .libelleMateriel(UPDATED_LIBELLE_MATERIEL)
            .typeGroup(UPDATED_TYPE_GROUP)
            .provenance(UPDATED_PROVENANCE)
            .fournisseur(UPDATED_FOURNISSEUR)
            .date(UPDATED_DATE);
        return reception;
    }

    @BeforeEach
    public void initTest() {
        reception = createEntity(em);
    }

    @Test
    @Transactional
    void createReception() throws Exception {
        int databaseSizeBeforeCreate = receptionRepository.findAll().size();
        // Create the Reception
        restReceptionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reception)))
            .andExpect(status().isCreated());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeCreate + 1);
        Reception testReception = receptionList.get(receptionList.size() - 1);
        assertThat(testReception.getLibelleMateriel()).isEqualTo(DEFAULT_LIBELLE_MATERIEL);
        assertThat(testReception.getTypeGroup()).isEqualTo(DEFAULT_TYPE_GROUP);
        assertThat(testReception.getProvenance()).isEqualTo(DEFAULT_PROVENANCE);
        assertThat(testReception.getFournisseur()).isEqualTo(DEFAULT_FOURNISSEUR);
        assertThat(testReception.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    void createReceptionWithExistingId() throws Exception {
        // Create the Reception with an existing ID
        reception.setId(1L);

        int databaseSizeBeforeCreate = receptionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceptionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reception)))
            .andExpect(status().isBadRequest());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkLibelleMaterielIsRequired() throws Exception {
        int databaseSizeBeforeTest = receptionRepository.findAll().size();
        // set the field null
        reception.setLibelleMateriel(null);

        // Create the Reception, which fails.

        restReceptionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reception)))
            .andExpect(status().isBadRequest());

        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTypeGroupIsRequired() throws Exception {
        int databaseSizeBeforeTest = receptionRepository.findAll().size();
        // set the field null
        reception.setTypeGroup(null);

        // Create the Reception, which fails.

        restReceptionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reception)))
            .andExpect(status().isBadRequest());

        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkProvenanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = receptionRepository.findAll().size();
        // set the field null
        reception.setProvenance(null);

        // Create the Reception, which fails.

        restReceptionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reception)))
            .andExpect(status().isBadRequest());

        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkFournisseurIsRequired() throws Exception {
        int databaseSizeBeforeTest = receptionRepository.findAll().size();
        // set the field null
        reception.setFournisseur(null);

        // Create the Reception, which fails.

        restReceptionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reception)))
            .andExpect(status().isBadRequest());

        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = receptionRepository.findAll().size();
        // set the field null
        reception.setDate(null);

        // Create the Reception, which fails.

        restReceptionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reception)))
            .andExpect(status().isBadRequest());

        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllReceptions() throws Exception {
        // Initialize the database
        receptionRepository.saveAndFlush(reception);

        // Get all the receptionList
        restReceptionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reception.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleMateriel").value(hasItem(DEFAULT_LIBELLE_MATERIEL)))
            .andExpect(jsonPath("$.[*].typeGroup").value(hasItem(DEFAULT_TYPE_GROUP.toString())))
            .andExpect(jsonPath("$.[*].provenance").value(hasItem(DEFAULT_PROVENANCE.toString())))
            .andExpect(jsonPath("$.[*].fournisseur").value(hasItem(DEFAULT_FOURNISSEUR)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    void getReception() throws Exception {
        // Initialize the database
        receptionRepository.saveAndFlush(reception);

        // Get the reception
        restReceptionMockMvc
            .perform(get(ENTITY_API_URL_ID, reception.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reception.getId().intValue()))
            .andExpect(jsonPath("$.libelleMateriel").value(DEFAULT_LIBELLE_MATERIEL))
            .andExpect(jsonPath("$.typeGroup").value(DEFAULT_TYPE_GROUP.toString()))
            .andExpect(jsonPath("$.provenance").value(DEFAULT_PROVENANCE.toString()))
            .andExpect(jsonPath("$.fournisseur").value(DEFAULT_FOURNISSEUR))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingReception() throws Exception {
        // Get the reception
        restReceptionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewReception() throws Exception {
        // Initialize the database
        receptionRepository.saveAndFlush(reception);

        int databaseSizeBeforeUpdate = receptionRepository.findAll().size();

        // Update the reception
        Reception updatedReception = receptionRepository.findById(reception.getId()).get();
        // Disconnect from session so that the updates on updatedReception are not directly saved in db
        em.detach(updatedReception);
        updatedReception
            .libelleMateriel(UPDATED_LIBELLE_MATERIEL)
            .typeGroup(UPDATED_TYPE_GROUP)
            .provenance(UPDATED_PROVENANCE)
            .fournisseur(UPDATED_FOURNISSEUR)
            .date(UPDATED_DATE);

        restReceptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedReception.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedReception))
            )
            .andExpect(status().isOk());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeUpdate);
        Reception testReception = receptionList.get(receptionList.size() - 1);
        assertThat(testReception.getLibelleMateriel()).isEqualTo(UPDATED_LIBELLE_MATERIEL);
        assertThat(testReception.getTypeGroup()).isEqualTo(UPDATED_TYPE_GROUP);
        assertThat(testReception.getProvenance()).isEqualTo(UPDATED_PROVENANCE);
        assertThat(testReception.getFournisseur()).isEqualTo(UPDATED_FOURNISSEUR);
        assertThat(testReception.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void putNonExistingReception() throws Exception {
        int databaseSizeBeforeUpdate = receptionRepository.findAll().size();
        reception.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, reception.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reception))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchReception() throws Exception {
        int databaseSizeBeforeUpdate = receptionRepository.findAll().size();
        reception.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReceptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reception))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamReception() throws Exception {
        int databaseSizeBeforeUpdate = receptionRepository.findAll().size();
        reception.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReceptionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reception)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateReceptionWithPatch() throws Exception {
        // Initialize the database
        receptionRepository.saveAndFlush(reception);

        int databaseSizeBeforeUpdate = receptionRepository.findAll().size();

        // Update the reception using partial update
        Reception partialUpdatedReception = new Reception();
        partialUpdatedReception.setId(reception.getId());

        partialUpdatedReception
            .libelleMateriel(UPDATED_LIBELLE_MATERIEL)
            .typeGroup(UPDATED_TYPE_GROUP)
            .provenance(UPDATED_PROVENANCE)
            .date(UPDATED_DATE);

        restReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReception.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReception))
            )
            .andExpect(status().isOk());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeUpdate);
        Reception testReception = receptionList.get(receptionList.size() - 1);
        assertThat(testReception.getLibelleMateriel()).isEqualTo(UPDATED_LIBELLE_MATERIEL);
        assertThat(testReception.getTypeGroup()).isEqualTo(UPDATED_TYPE_GROUP);
        assertThat(testReception.getProvenance()).isEqualTo(UPDATED_PROVENANCE);
        assertThat(testReception.getFournisseur()).isEqualTo(DEFAULT_FOURNISSEUR);
        assertThat(testReception.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void fullUpdateReceptionWithPatch() throws Exception {
        // Initialize the database
        receptionRepository.saveAndFlush(reception);

        int databaseSizeBeforeUpdate = receptionRepository.findAll().size();

        // Update the reception using partial update
        Reception partialUpdatedReception = new Reception();
        partialUpdatedReception.setId(reception.getId());

        partialUpdatedReception
            .libelleMateriel(UPDATED_LIBELLE_MATERIEL)
            .typeGroup(UPDATED_TYPE_GROUP)
            .provenance(UPDATED_PROVENANCE)
            .fournisseur(UPDATED_FOURNISSEUR)
            .date(UPDATED_DATE);

        restReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReception.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReception))
            )
            .andExpect(status().isOk());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeUpdate);
        Reception testReception = receptionList.get(receptionList.size() - 1);
        assertThat(testReception.getLibelleMateriel()).isEqualTo(UPDATED_LIBELLE_MATERIEL);
        assertThat(testReception.getTypeGroup()).isEqualTo(UPDATED_TYPE_GROUP);
        assertThat(testReception.getProvenance()).isEqualTo(UPDATED_PROVENANCE);
        assertThat(testReception.getFournisseur()).isEqualTo(UPDATED_FOURNISSEUR);
        assertThat(testReception.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingReception() throws Exception {
        int databaseSizeBeforeUpdate = receptionRepository.findAll().size();
        reception.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, reception.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reception))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchReception() throws Exception {
        int databaseSizeBeforeUpdate = receptionRepository.findAll().size();
        reception.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reception))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamReception() throws Exception {
        int databaseSizeBeforeUpdate = receptionRepository.findAll().size();
        reception.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(reception))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Reception in the database
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteReception() throws Exception {
        // Initialize the database
        receptionRepository.saveAndFlush(reception);

        int databaseSizeBeforeDelete = receptionRepository.findAll().size();

        // Delete the reception
        restReceptionMockMvc
            .perform(delete(ENTITY_API_URL_ID, reception.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reception> receptionList = receptionRepository.findAll();
        assertThat(receptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
