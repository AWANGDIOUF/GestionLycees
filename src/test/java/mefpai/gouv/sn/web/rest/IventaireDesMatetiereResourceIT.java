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
import mefpai.gouv.sn.domain.IventaireDesMatetiere;
import mefpai.gouv.sn.domain.enumeration.Group;
import mefpai.gouv.sn.repository.IventaireDesMatetiereRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link IventaireDesMatetiereResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class IventaireDesMatetiereResourceIT {

    private static final Group DEFAULT_GROUP = Group.GROUP1;
    private static final Group UPDATED_GROUP = Group.GROUP2;

    private static final byte[] DEFAULT_DESIGNATION_MEMBRE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DESIGNATION_MEMBRE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DESIGNATION_MEMBRE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DESIGNATION_MEMBRE_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_PV_DINVENTAIRE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PV_DINVENTAIRE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PV_DINVENTAIRE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PV_DINVENTAIRE_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/iventaire-des-matetieres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private IventaireDesMatetiereRepository iventaireDesMatetiereRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIventaireDesMatetiereMockMvc;

    private IventaireDesMatetiere iventaireDesMatetiere;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IventaireDesMatetiere createEntity(EntityManager em) {
        IventaireDesMatetiere iventaireDesMatetiere = new IventaireDesMatetiere()
            .group(DEFAULT_GROUP)
            .designationMembre(DEFAULT_DESIGNATION_MEMBRE)
            .designationMembreContentType(DEFAULT_DESIGNATION_MEMBRE_CONTENT_TYPE)
            .pvDinventaire(DEFAULT_PV_DINVENTAIRE)
            .pvDinventaireContentType(DEFAULT_PV_DINVENTAIRE_CONTENT_TYPE);
        return iventaireDesMatetiere;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IventaireDesMatetiere createUpdatedEntity(EntityManager em) {
        IventaireDesMatetiere iventaireDesMatetiere = new IventaireDesMatetiere()
            .group(UPDATED_GROUP)
            .designationMembre(UPDATED_DESIGNATION_MEMBRE)
            .designationMembreContentType(UPDATED_DESIGNATION_MEMBRE_CONTENT_TYPE)
            .pvDinventaire(UPDATED_PV_DINVENTAIRE)
            .pvDinventaireContentType(UPDATED_PV_DINVENTAIRE_CONTENT_TYPE);
        return iventaireDesMatetiere;
    }

    @BeforeEach
    public void initTest() {
        iventaireDesMatetiere = createEntity(em);
    }

    @Test
    @Transactional
    void createIventaireDesMatetiere() throws Exception {
        int databaseSizeBeforeCreate = iventaireDesMatetiereRepository.findAll().size();
        // Create the IventaireDesMatetiere
        restIventaireDesMatetiereMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(iventaireDesMatetiere))
            )
            .andExpect(status().isCreated());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeCreate + 1);
        IventaireDesMatetiere testIventaireDesMatetiere = iventaireDesMatetiereList.get(iventaireDesMatetiereList.size() - 1);
        assertThat(testIventaireDesMatetiere.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testIventaireDesMatetiere.getDesignationMembre()).isEqualTo(DEFAULT_DESIGNATION_MEMBRE);
        assertThat(testIventaireDesMatetiere.getDesignationMembreContentType()).isEqualTo(DEFAULT_DESIGNATION_MEMBRE_CONTENT_TYPE);
        assertThat(testIventaireDesMatetiere.getPvDinventaire()).isEqualTo(DEFAULT_PV_DINVENTAIRE);
        assertThat(testIventaireDesMatetiere.getPvDinventaireContentType()).isEqualTo(DEFAULT_PV_DINVENTAIRE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createIventaireDesMatetiereWithExistingId() throws Exception {
        // Create the IventaireDesMatetiere with an existing ID
        iventaireDesMatetiere.setId(1L);

        int databaseSizeBeforeCreate = iventaireDesMatetiereRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restIventaireDesMatetiereMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(iventaireDesMatetiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllIventaireDesMatetieres() throws Exception {
        // Initialize the database
        iventaireDesMatetiereRepository.saveAndFlush(iventaireDesMatetiere);

        // Get all the iventaireDesMatetiereList
        restIventaireDesMatetiereMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iventaireDesMatetiere.getId().intValue())))
            .andExpect(jsonPath("$.[*].group").value(hasItem(DEFAULT_GROUP.toString())))
            .andExpect(jsonPath("$.[*].designationMembreContentType").value(hasItem(DEFAULT_DESIGNATION_MEMBRE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].designationMembre").value(hasItem(Base64Utils.encodeToString(DEFAULT_DESIGNATION_MEMBRE))))
            .andExpect(jsonPath("$.[*].pvDinventaireContentType").value(hasItem(DEFAULT_PV_DINVENTAIRE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].pvDinventaire").value(hasItem(Base64Utils.encodeToString(DEFAULT_PV_DINVENTAIRE))));
    }

    @Test
    @Transactional
    void getIventaireDesMatetiere() throws Exception {
        // Initialize the database
        iventaireDesMatetiereRepository.saveAndFlush(iventaireDesMatetiere);

        // Get the iventaireDesMatetiere
        restIventaireDesMatetiereMockMvc
            .perform(get(ENTITY_API_URL_ID, iventaireDesMatetiere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(iventaireDesMatetiere.getId().intValue()))
            .andExpect(jsonPath("$.group").value(DEFAULT_GROUP.toString()))
            .andExpect(jsonPath("$.designationMembreContentType").value(DEFAULT_DESIGNATION_MEMBRE_CONTENT_TYPE))
            .andExpect(jsonPath("$.designationMembre").value(Base64Utils.encodeToString(DEFAULT_DESIGNATION_MEMBRE)))
            .andExpect(jsonPath("$.pvDinventaireContentType").value(DEFAULT_PV_DINVENTAIRE_CONTENT_TYPE))
            .andExpect(jsonPath("$.pvDinventaire").value(Base64Utils.encodeToString(DEFAULT_PV_DINVENTAIRE)));
    }

    @Test
    @Transactional
    void getNonExistingIventaireDesMatetiere() throws Exception {
        // Get the iventaireDesMatetiere
        restIventaireDesMatetiereMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewIventaireDesMatetiere() throws Exception {
        // Initialize the database
        iventaireDesMatetiereRepository.saveAndFlush(iventaireDesMatetiere);

        int databaseSizeBeforeUpdate = iventaireDesMatetiereRepository.findAll().size();

        // Update the iventaireDesMatetiere
        IventaireDesMatetiere updatedIventaireDesMatetiere = iventaireDesMatetiereRepository.findById(iventaireDesMatetiere.getId()).get();
        // Disconnect from session so that the updates on updatedIventaireDesMatetiere are not directly saved in db
        em.detach(updatedIventaireDesMatetiere);
        updatedIventaireDesMatetiere
            .group(UPDATED_GROUP)
            .designationMembre(UPDATED_DESIGNATION_MEMBRE)
            .designationMembreContentType(UPDATED_DESIGNATION_MEMBRE_CONTENT_TYPE)
            .pvDinventaire(UPDATED_PV_DINVENTAIRE)
            .pvDinventaireContentType(UPDATED_PV_DINVENTAIRE_CONTENT_TYPE);

        restIventaireDesMatetiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedIventaireDesMatetiere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedIventaireDesMatetiere))
            )
            .andExpect(status().isOk());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeUpdate);
        IventaireDesMatetiere testIventaireDesMatetiere = iventaireDesMatetiereList.get(iventaireDesMatetiereList.size() - 1);
        assertThat(testIventaireDesMatetiere.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testIventaireDesMatetiere.getDesignationMembre()).isEqualTo(UPDATED_DESIGNATION_MEMBRE);
        assertThat(testIventaireDesMatetiere.getDesignationMembreContentType()).isEqualTo(UPDATED_DESIGNATION_MEMBRE_CONTENT_TYPE);
        assertThat(testIventaireDesMatetiere.getPvDinventaire()).isEqualTo(UPDATED_PV_DINVENTAIRE);
        assertThat(testIventaireDesMatetiere.getPvDinventaireContentType()).isEqualTo(UPDATED_PV_DINVENTAIRE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingIventaireDesMatetiere() throws Exception {
        int databaseSizeBeforeUpdate = iventaireDesMatetiereRepository.findAll().size();
        iventaireDesMatetiere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIventaireDesMatetiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, iventaireDesMatetiere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(iventaireDesMatetiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchIventaireDesMatetiere() throws Exception {
        int databaseSizeBeforeUpdate = iventaireDesMatetiereRepository.findAll().size();
        iventaireDesMatetiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIventaireDesMatetiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(iventaireDesMatetiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamIventaireDesMatetiere() throws Exception {
        int databaseSizeBeforeUpdate = iventaireDesMatetiereRepository.findAll().size();
        iventaireDesMatetiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIventaireDesMatetiereMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(iventaireDesMatetiere))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateIventaireDesMatetiereWithPatch() throws Exception {
        // Initialize the database
        iventaireDesMatetiereRepository.saveAndFlush(iventaireDesMatetiere);

        int databaseSizeBeforeUpdate = iventaireDesMatetiereRepository.findAll().size();

        // Update the iventaireDesMatetiere using partial update
        IventaireDesMatetiere partialUpdatedIventaireDesMatetiere = new IventaireDesMatetiere();
        partialUpdatedIventaireDesMatetiere.setId(iventaireDesMatetiere.getId());

        partialUpdatedIventaireDesMatetiere
            .designationMembre(UPDATED_DESIGNATION_MEMBRE)
            .designationMembreContentType(UPDATED_DESIGNATION_MEMBRE_CONTENT_TYPE)
            .pvDinventaire(UPDATED_PV_DINVENTAIRE)
            .pvDinventaireContentType(UPDATED_PV_DINVENTAIRE_CONTENT_TYPE);

        restIventaireDesMatetiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIventaireDesMatetiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIventaireDesMatetiere))
            )
            .andExpect(status().isOk());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeUpdate);
        IventaireDesMatetiere testIventaireDesMatetiere = iventaireDesMatetiereList.get(iventaireDesMatetiereList.size() - 1);
        assertThat(testIventaireDesMatetiere.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testIventaireDesMatetiere.getDesignationMembre()).isEqualTo(UPDATED_DESIGNATION_MEMBRE);
        assertThat(testIventaireDesMatetiere.getDesignationMembreContentType()).isEqualTo(UPDATED_DESIGNATION_MEMBRE_CONTENT_TYPE);
        assertThat(testIventaireDesMatetiere.getPvDinventaire()).isEqualTo(UPDATED_PV_DINVENTAIRE);
        assertThat(testIventaireDesMatetiere.getPvDinventaireContentType()).isEqualTo(UPDATED_PV_DINVENTAIRE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateIventaireDesMatetiereWithPatch() throws Exception {
        // Initialize the database
        iventaireDesMatetiereRepository.saveAndFlush(iventaireDesMatetiere);

        int databaseSizeBeforeUpdate = iventaireDesMatetiereRepository.findAll().size();

        // Update the iventaireDesMatetiere using partial update
        IventaireDesMatetiere partialUpdatedIventaireDesMatetiere = new IventaireDesMatetiere();
        partialUpdatedIventaireDesMatetiere.setId(iventaireDesMatetiere.getId());

        partialUpdatedIventaireDesMatetiere
            .group(UPDATED_GROUP)
            .designationMembre(UPDATED_DESIGNATION_MEMBRE)
            .designationMembreContentType(UPDATED_DESIGNATION_MEMBRE_CONTENT_TYPE)
            .pvDinventaire(UPDATED_PV_DINVENTAIRE)
            .pvDinventaireContentType(UPDATED_PV_DINVENTAIRE_CONTENT_TYPE);

        restIventaireDesMatetiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIventaireDesMatetiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIventaireDesMatetiere))
            )
            .andExpect(status().isOk());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeUpdate);
        IventaireDesMatetiere testIventaireDesMatetiere = iventaireDesMatetiereList.get(iventaireDesMatetiereList.size() - 1);
        assertThat(testIventaireDesMatetiere.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testIventaireDesMatetiere.getDesignationMembre()).isEqualTo(UPDATED_DESIGNATION_MEMBRE);
        assertThat(testIventaireDesMatetiere.getDesignationMembreContentType()).isEqualTo(UPDATED_DESIGNATION_MEMBRE_CONTENT_TYPE);
        assertThat(testIventaireDesMatetiere.getPvDinventaire()).isEqualTo(UPDATED_PV_DINVENTAIRE);
        assertThat(testIventaireDesMatetiere.getPvDinventaireContentType()).isEqualTo(UPDATED_PV_DINVENTAIRE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingIventaireDesMatetiere() throws Exception {
        int databaseSizeBeforeUpdate = iventaireDesMatetiereRepository.findAll().size();
        iventaireDesMatetiere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIventaireDesMatetiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, iventaireDesMatetiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(iventaireDesMatetiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchIventaireDesMatetiere() throws Exception {
        int databaseSizeBeforeUpdate = iventaireDesMatetiereRepository.findAll().size();
        iventaireDesMatetiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIventaireDesMatetiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(iventaireDesMatetiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamIventaireDesMatetiere() throws Exception {
        int databaseSizeBeforeUpdate = iventaireDesMatetiereRepository.findAll().size();
        iventaireDesMatetiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIventaireDesMatetiereMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(iventaireDesMatetiere))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the IventaireDesMatetiere in the database
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteIventaireDesMatetiere() throws Exception {
        // Initialize the database
        iventaireDesMatetiereRepository.saveAndFlush(iventaireDesMatetiere);

        int databaseSizeBeforeDelete = iventaireDesMatetiereRepository.findAll().size();

        // Delete the iventaireDesMatetiere
        restIventaireDesMatetiereMockMvc
            .perform(delete(ENTITY_API_URL_ID, iventaireDesMatetiere.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<IventaireDesMatetiere> iventaireDesMatetiereList = iventaireDesMatetiereRepository.findAll();
        assertThat(iventaireDesMatetiereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
